import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import type { IconType } from 'react-icons';

// Registration type constants
const REGISTER_PARTICIPANT = 'participant';
const REGISTER_SPEAKER = 'speaker';

// Configuration variables
const REGISTRATION_EMAIL = 'nurzhan.kozhamuratov@nu.edu.kz';

// Helper function to render icons safely
const Icon = ({ icon, className }: { icon: IconType, className?: string }) => {
  // @ts-ignore - bypass the TypeScript error with the icon type
  return React.createElement(icon, { className });
};

// Field validation interface
interface FieldState {
  value: string;
  valid: boolean;
  touched: boolean;
  errorMessage: string;
}

const Register: React.FC = () => {
  // Create refs for input fields
  const inputRefs = React.useRef<{[key: string]: HTMLInputElement | HTMLTextAreaElement | null}>({});
  
  // Add state for email data
  const [emailData, setEmailData] = useState({
    subject: '',
    body: '',
    copySuccess: '',
  });
  
  // Form state with validation
  const [formData, setFormData] = useState({
    registrationType: REGISTER_PARTICIPANT,
    firstName: { value: '', valid: false, touched: false, errorMessage: 'First name is required' },
    lastName: { value: '', valid: false, touched: false, errorMessage: 'Last name is required' },
    middleName: { value: '', valid: true, touched: false, errorMessage: '' },
    birthDate: { value: '', valid: true, touched: false, errorMessage: '' },
    institution: { value: '', valid: true, touched: false, errorMessage: '' },
    country: { value: '', valid: true, touched: false, errorMessage: '' },
    email: { value: '', valid: false, touched: false, errorMessage: 'Valid email address is required' },
    phone: { value: '', valid: true, touched: false, errorMessage: '' },
    // Speaker-specific fields
    paperTitle: { value: '', valid: true, touched: false, errorMessage: 'Paper title is required for speakers' },
    paperAbstract: { value: '', valid: true, touched: false, errorMessage: 'Abstract is required for speakers' },
    coAuthors: { value: '', valid: true, touched: false, errorMessage: '' },
    keywords: { value: '', valid: true, touched: false, errorMessage: '' },
    // Form state
    error: '',
    loading: false
  });

  // Tooltips state
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  
  // Add state for saving indicator
  const [isSaving, setIsSaving] = useState(false);
  
  // Load saved form data from localStorage on component mount
  useEffect(() => {
    try {
      // Check if we're in email sending mode
      const isEmailSending = localStorage.getItem('caaeEmailSending') === 'true';
      
      // If we're in email sending mode, we need to check if it's a new visit or
      // returning after opening email client
      if (isEmailSending) {
        // Check if we have form data saved - if not, or if coming from a different session,
        // reset the email sending flag
        const savedData = localStorage.getItem('caaeRegistrationForm');
        
        if (!savedData) {
          // No form data, so this is likely a new session - reset the flags
          localStorage.removeItem('caaeEmailSending');
          localStorage.removeItem('caaeEmailData');
        } else {
          // We have form data and the email flag, so restore the data and show the instructions
          try {
            const parsedData = JSON.parse(savedData);
            
            // Restore the form data first (even though we're in instructions mode)
            // This ensures the form data is available if we need to regenerate email content
            
            // Only update fields that exist in our form state
            const validFields = Object.keys(formData).filter(key => 
              key !== 'error' && key !== 'loading'
            );
            
            // Create a new form state with saved values
            const restoredData = { ...formData };
            
            // Type guard for field state
            const isFieldState = (obj: any): obj is FieldState => {
              return obj && typeof obj === 'object' && 'value' in obj && 'valid' in obj;
            };
            
            // Update fields from saved data
            validFields.forEach(key => {
              if (key === 'registrationType' && parsedData.registrationType) {
                restoredData.registrationType = parsedData.registrationType as typeof REGISTER_PARTICIPANT | typeof REGISTER_SPEAKER;
              } else if (key !== 'registrationType' && parsedData[key as keyof typeof parsedData]) {
                const savedField = parsedData[key as keyof typeof parsedData] as Partial<FieldState>;
                if (savedField && typeof savedField.value === 'string') {
                  const typedKey = key as keyof typeof formData;
                  const fieldData = restoredData[typedKey];
                  
                  // Use the type guard to ensure we have a field state
                  if (isFieldState(fieldData)) {
                    fieldData.value = savedField.value;
                    fieldData.valid = validateField(key, savedField.value);
                  }
                }
              }
            });
            
            setFormData(restoredData);
            
            // After restoring form data, also update inputRefs
            setTimeout(() => {
              Object.keys(inputRefs.current).forEach(key => {
                const input = inputRefs.current[key];
                const fieldData = restoredData[key as keyof typeof restoredData];
                
                // Use the type guard here too
                if (input && isFieldState(fieldData)) {
                  input.value = fieldData.value;
                }
              });
              
              // Check if we have saved email data first
              const savedEmailData = localStorage.getItem('caaeEmailData');
              if (savedEmailData) {
                try {
                  const parsedEmailData = JSON.parse(savedEmailData);
                  if (parsedEmailData.subject && parsedEmailData.body) {
                    // Restore from saved email data
                    setEmailData({
                      subject: parsedEmailData.subject,
                      body: parsedEmailData.body,
                      copySuccess: ''
                    });
                    console.log('Restored email data from localStorage');
                    // Make sure we're showing instructions, not email warning
                    setShowInstructions(true);
                    setShowEmailWarning(false);
                    return;
                  }
                } catch (e) {
                  console.error('Error parsing saved email data:', e);
                }
              }
              
              // If no saved email data or error, force regeneration from form data
              const emailData = regenerateEmailDataFromForm();
              if (emailData) {
                setEmailData({
                  subject: emailData.subject,
                  body: emailData.body,
                  copySuccess: ''
                });
                console.log('Email data regenerated for restored form');
                
                // Always show instructions initially
                setShowInstructions(true);
                setShowEmailWarning(false);
                return;
              }

              // If we couldn't regenerate from form data, fall back to the old method
              // Generate email data based on the restored values
              // Create email subject
              const emailSubject = `CAEA Conference Registration: ${restoredData.registrationType === REGISTER_SPEAKER ? 'Speaker' : 'Participant'} - ${restoredData.firstName.value} ${restoredData.lastName.value}`;
              
              // Create email body using the restored values
              let emailBody = `
Registration Type: ${restoredData.registrationType === REGISTER_SPEAKER ? 'Speaker' : 'Participant'}

Personal Information:
-------------------
First Name: ${restoredData.firstName.value}
Last Name: ${restoredData.lastName.value}
Middle Name: ${restoredData.middleName.value || 'N/A'}
Birth Date: ${restoredData.birthDate.value || 'N/A'}
Institution: ${restoredData.institution.value || 'N/A'}
Country: ${restoredData.country.value || 'N/A'}
Email: ${restoredData.email.value || ''}
Phone: ${restoredData.phone.value || 'N/A'}
`;

              // Add speaker-specific information if applicable
              if (restoredData.registrationType === REGISTER_SPEAKER) {
                emailBody += `
Paper Information:
----------------
Title: ${restoredData.paperTitle.value || ''}
Abstract: ${restoredData.paperAbstract.value || ''}
Co-Authors: ${restoredData.coAuthors.value || 'None'}
Keywords: ${restoredData.keywords.value || 'N/A'}

Note: Please attach your full paper in PDF format to this email.
`;
              }
              
              emailBody += `
Registration Date: ${new Date().toLocaleString()}
`;

              // Store email data in state for copy functionality (with linebreaks for display)
              const displayEmailBody = emailBody.replace(/\r\n/g, '\n');
              setEmailData({
                subject: emailSubject,
                body: displayEmailBody,
                copySuccess: ''
              });
              
              // Save the email data to localStorage to ensure it persists between screen changes
              try {
                localStorage.setItem('caaeEmailData', JSON.stringify({
                  subject: emailSubject,
                  body: displayEmailBody
                }));
              } catch (error) {
                console.error('Failed to save email data to localStorage:', error);
              }
              
              console.log('Email body length:', emailBody.length);
              setShowInstructions(true);
              setShowEmailWarning(false);
            }, 0);
          } catch (error) {
            console.error('Error parsing saved form data:', error);
            
            // Even if there was an error parsing the form data, try to regenerate email data
            const emailData = regenerateEmailDataFromForm();
            if (emailData) {
              setEmailData({
                subject: emailData.subject,
                body: emailData.body,
                copySuccess: ''
              });
              console.log('Email data regenerated after error parsing form data');
              setShowInstructions(true);
              setShowEmailWarning(false);
            }
          }
        }
        
        return;
      }
      
      const savedData = localStorage.getItem('caaeRegistrationForm');
      if (savedData) {
        const parsedData = JSON.parse(savedData) as Partial<typeof formData>;
        
        // Only update fields that exist in our form state
        const validFields = Object.keys(formData).filter(key => 
          key !== 'error' && key !== 'loading'
        );
        
        // Create a new form state with saved values
        const restoredData = { ...formData };
        
        // Type guard for field state
        const isFieldState = (obj: any): obj is FieldState => {
          return obj && typeof obj === 'object' && 'value' in obj && 'valid' in obj;
        };
        
        // Update fields from saved data
        validFields.forEach(key => {
          if (key === 'registrationType' && parsedData.registrationType) {
            restoredData.registrationType = parsedData.registrationType as typeof REGISTER_PARTICIPANT | typeof REGISTER_SPEAKER;
          } else if (key !== 'registrationType' && parsedData[key as keyof typeof parsedData]) {
            const savedField = parsedData[key as keyof typeof parsedData] as Partial<FieldState>;
            if (savedField && typeof savedField.value === 'string') {
              const typedKey = key as keyof typeof formData;
              const fieldData = restoredData[typedKey];
              
              // Use the type guard to ensure we have a field state
              if (isFieldState(fieldData)) {
                fieldData.value = savedField.value;
                fieldData.valid = validateField(key, savedField.value);
              }
            }
          }
        });
        
        setFormData(restoredData);
        
        // After restoring, update the ref values for the fields
        setTimeout(() => {
          Object.keys(inputRefs.current).forEach(key => {
            const input = inputRefs.current[key];
            const fieldData = restoredData[key as keyof typeof restoredData];
            
            // Use the type guard here too
            if (input && isFieldState(fieldData)) {
              input.value = fieldData.value;
            }
          });
        }, 0);
      }
    } catch (error) {
      console.error('Error loading saved form data:', error);
      // Clear potentially corrupted localStorage data
      localStorage.removeItem('caaeRegistrationForm');
      localStorage.removeItem('caaeEmailSending');
    }
  }, []);
  
  // Save form data to localStorage when it changes
  useEffect(() => {
    // Create an object to store saved form data
    interface SavedFormData {
      registrationType: string;
      [key: string]: unknown;
    }
    
    // Type guard for field state (reused here)
    const isFieldState = (obj: any): obj is FieldState => {
      return obj && typeof obj === 'object' && 'value' in obj && 'valid' in obj;
    };
    
    // Only save the registration type and field values, not validation state
    const dataToSave: SavedFormData = {
      registrationType: formData.registrationType
    };
    
    // Add field values
    Object.entries(formData).forEach(([key, field]) => {
      if (key !== 'registrationType' && key !== 'error' && key !== 'loading') {
        // Use the type guard to check if this is a field state
        if (isFieldState(field)) {
          // For each field, save its current value from the ref if available
          if (inputRefs.current[key]) {
            const currentValue = inputRefs.current[key]?.value || field.value;
            dataToSave[key] = { value: currentValue };
          } else {
            dataToSave[key] = { value: field.value };
          }
        }
      }
    });
    
    // Show saving indicator
    setIsSaving(true);
    
    // Save to localStorage
    localStorage.setItem('caaeRegistrationForm', JSON.stringify(dataToSave));
    
    // Hide saving indicator after a short delay
    const timer = setTimeout(() => {
      setIsSaving(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [formData]);

  // Validate email format
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };
  
  // Validate date is not in the future and not unreasonably in the past
  const validateDate = (dateString: string): boolean => {
    if (!dateString) return true; // Empty date is valid (not required)
    
    const inputDate = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(inputDate.getTime())) return false;
    
    // Check if date is not in the future - set hours to 0 to compare just the dates
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day for fair comparison
    if (inputDate > today) return false;
    
    // Check if date is not unreasonably in the past (more than 120 years ago)
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);
    if (inputDate < minDate) return false;
    
    return true;
  };
  
  // Validation helper function
  const validateField = (fieldName: string, value: string): boolean => {
    switch (fieldName) {
      case 'firstName':
      case 'lastName':
        return value.trim().length > 0;
      case 'email':
        return validateEmail(value);
      case 'birthDate':
        return validateDate(value);
      case 'paperTitle':
      case 'paperAbstract':
        return formData.registrationType !== REGISTER_SPEAKER || value.trim().length > 0;
      default:
        return true;
    }
  };

  // Update validation for speaker fields when registration type changes
  useEffect(() => {
    // Only update validation state for speaker-specific fields
    if (formData.registrationType === REGISTER_SPEAKER) {
      // Get current values from refs
      const paperTitleValue = inputRefs.current.paperTitle?.value || '';
      const paperAbstractValue = inputRefs.current.paperAbstract?.value || '';
      
      setFormData(prev => {
        return {
          ...prev,
          paperTitle: {
            ...prev.paperTitle,
            value: paperTitleValue,
            valid: prev.paperTitle.touched ? validateField('paperTitle', paperTitleValue) : prev.paperTitle.valid,
            errorMessage: prev.paperTitle.touched && !validateField('paperTitle', paperTitleValue) 
              ? 'Paper title is required for speakers' 
              : prev.paperTitle.errorMessage
          },
          paperAbstract: {
            ...prev.paperAbstract,
            value: paperAbstractValue,
            valid: prev.paperAbstract.touched ? validateField('paperAbstract', paperAbstractValue) : prev.paperAbstract.valid,
            errorMessage: prev.paperAbstract.touched && !validateField('paperAbstract', paperAbstractValue) 
              ? 'Abstract is required for speakers' 
              : prev.paperAbstract.errorMessage
          }
        };
      });
    } else {
      // When switching from speaker to participant, make paper fields valid
      setFormData(prev => ({
        ...prev,
        paperTitle: {
          ...prev.paperTitle,
          valid: true,
          errorMessage: ''
        },
        paperAbstract: {
          ...prev.paperAbstract,
          valid: true,
          errorMessage: ''
        }
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.registrationType]);

  // Special handling for registration type change
  const handleRegistrationTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      registrationType: value
    }));
  };
  
  // Handle blur to validate and update state based on input value
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // On blur we validate and mark as touched
    const valid = validateField(name, value);
    let errorMessage = '';
    
    if (!valid) {
      if (name === 'firstName') errorMessage = 'First name is required';
      else if (name === 'lastName') errorMessage = 'Last name is required';
      else if (name === 'email') errorMessage = 'Valid email address is required';
      else if (name === 'birthDate') errorMessage = 'Please enter a valid date (not in the future and not too far in the past)';
      else if (name === 'paperTitle') errorMessage = 'Paper title is required for speakers';
      else if (name === 'paperAbstract') errorMessage = 'Abstract is required for speakers';
    }
    
    // Update state with the current value from the input field
    setFormData(prev => ({
      ...prev,
      [name]: {
        ...(prev[name as keyof typeof prev] as FieldState),
        value, // Get the value directly from the input
        valid,
        touched: true,
        errorMessage
      }
    }));
  };

  // Handle date change - validate immediately
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Validate the date immediately
    const valid = validateDate(value);
    let errorMessage = '';
    
    if (!valid) {
      errorMessage = 'Please enter a valid date (not in the future and not too far in the past)';
    }
    
    // Update state with the current value and validation result
    setFormData(prev => ({
      ...prev,
      [name]: {
        ...(prev[name as keyof typeof prev] as FieldState),
        value,
        valid,
        touched: true,
        errorMessage
      }
    }));
  };

  // Field input component with validation
  const FormField = ({ 
    label, 
    name, 
    type = 'text', 
    required = false,
    placeholder = '',
    tooltip = '',
    rows = 1
  }: { 
    label: string; 
    name: string; 
    type?: string;
    required?: boolean;
    placeholder?: string;
    tooltip?: string;
    rows?: number;
  }) => {
    const field = formData[name as keyof typeof formData] as FieldState;
    const showError = !field.valid && field.touched;
    
    // Create the ref for this input
    const setInputRef = (el: HTMLInputElement | HTMLTextAreaElement | null) => {
      inputRefs.current[name] = el;
    };
    
    // Simple tooltip toggling with stopPropagation to prevent focus loss
    const handleTooltipToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setActiveTooltip(activeTooltip === name ? null : name);
    };
    
    // Prevent default behavior on keydown to avoid form submission
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && type !== 'textarea') {
        e.preventDefault();
      }
    };
    
    // Get today's date as a string for max attribute
    const today = new Date().toISOString().split('T')[0];
    
    // Calculate min date (120 years ago)
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 120);
    const minDateString = minDate.toISOString().split('T')[0];
    
    // Date props
    const dateProps = type === 'date' ? { 
      max: today,
      min: minDateString,
      onChange: handleDateChange // Special handler for date inputs
    } : {};
    
    return (
      <div className="relative">
        <div className="flex items-center">
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          {tooltip && (
            <div className="relative ml-2" onClick={e => e.stopPropagation()}>
              <button
                type="button"
                onClick={handleTooltipToggle}
                onMouseDown={(e) => e.preventDefault()}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                aria-label="Show tooltip"
              >
                <Icon icon={FaIcons.FaInfoCircle} className="h-4 w-4" />
              </button>
              {activeTooltip === name && (
                <div 
                  className="absolute z-10 mt-2 w-72 px-3 py-2 bg-gray-800 text-white text-xs rounded shadow-lg -left-32 top-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  {tooltip}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-800"></div>
                </div>
              )}
            </div>
          )}
          {field.touched && (
            <div className="ml-auto">
              {field.valid ? 
                <Icon icon={FaIcons.FaCheck} className="h-4 w-4 text-green-500" /> : 
                <Icon icon={FaIcons.FaTimes} className="h-4 w-4 text-red-500" />
              }
            </div>
          )}
        </div>
        <div className="mt-1 relative">
          {type === 'textarea' ? (
            <textarea
              id={name}
              name={name}
              rows={rows}
              ref={setInputRef}
              defaultValue={field.value}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder={placeholder}
              className={`shadow-sm block w-full sm:text-sm rounded-md ${
                showError 
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-primary focus:border-primary'
              }`}
            />
          ) : (
            <input
              type={type}
              id={name}
              name={name}
              ref={setInputRef}
              defaultValue={field.value}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder={placeholder}
              {...dateProps}
              className={`shadow-sm block w-full sm:text-sm rounded-md ${
                showError 
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-primary focus:border-primary'
              }`}
            />
          )}
        </div>
        {showError && (
          <p className="mt-1 text-xs text-red-600 field-error">{field.errorMessage}</p>
        )}
      </div>
    );
  };

  // Check if form is valid - now using refs to get current values
  const isFormValid = () => {
    const requiredFields = ['firstName', 'lastName', 'email'];
    
    if (formData.registrationType === REGISTER_SPEAKER) {
      requiredFields.push('paperTitle', 'paperAbstract');
    }
    
    // Check each required field by getting its current value from the ref
    return requiredFields.every(field => {
      const value = inputRefs.current[field]?.value || '';
      return validateField(field, value);
    });
  };

  // Show email instructions when form is valid
  const [showInstructions, setShowInstructions] = useState(false);
  
  // Add state for showing email warning 
  const [showEmailWarning, setShowEmailWarning] = useState(false);
  
  // Add a loading state for the email button
  const [isEmailButtonLoading, setIsEmailButtonLoading] = useState(false);
  
  // Add this new function to directly rebuild email data from form data anytime
  const regenerateEmailDataFromForm = () => {
    try {
      // Try to get the form data from localStorage first
      const savedFormData = localStorage.getItem('caaeRegistrationForm');
      if (!savedFormData) {
        console.error('No saved form data available to regenerate email');
        return null;
      }
      
      const parsedFormData = JSON.parse(savedFormData);
      
      // Extract values from the saved form data
      const registrationType = parsedFormData.registrationType || 'participant';
      const firstName = parsedFormData.firstName?.value || '';
      const lastName = parsedFormData.lastName?.value || '';
      const middleName = parsedFormData.middleName?.value || 'N/A';
      const birthDate = parsedFormData.birthDate?.value || 'N/A';
      const institution = parsedFormData.institution?.value || 'N/A';
      const country = parsedFormData.country?.value || 'N/A';
      const email = parsedFormData.email?.value || '';
      const phone = parsedFormData.phone?.value || 'N/A';
      
      // Create email subject
      const emailSubject = `CAEA Conference Registration: ${registrationType === REGISTER_SPEAKER ? 'Speaker' : 'Participant'} - ${firstName} ${lastName}`;
      
      // Create email body
      let emailBody = `Registration Type: ${registrationType === REGISTER_SPEAKER ? 'Speaker' : 'Participant'}\n\n`;
      emailBody += `Personal Information:\n`;
      emailBody += `-------------------\n`;
      emailBody += `First Name: ${firstName}\n`;
      emailBody += `Last Name: ${lastName}\n`;
      emailBody += `Middle Name: ${middleName}\n`;
      emailBody += `Birth Date: ${birthDate}\n`;
      emailBody += `Institution: ${institution}\n`;
      emailBody += `Country: ${country}\n`;
      emailBody += `Email: ${email}\n`;
      emailBody += `Phone: ${phone}\n`;
      
      // Add speaker-specific information if applicable
      if (registrationType === REGISTER_SPEAKER) {
        const paperTitle = parsedFormData.paperTitle?.value || '';
        const paperAbstract = parsedFormData.paperAbstract?.value || '';
        const coAuthors = parsedFormData.coAuthors?.value || 'None';
        const keywords = parsedFormData.keywords?.value || 'N/A';
        
        emailBody += `\nPaper Information:\n`;
        emailBody += `----------------\n`;
        emailBody += `Title: ${paperTitle}\n`;
        emailBody += `Abstract: ${paperAbstract}\n`;
        emailBody += `Co-Authors: ${coAuthors}\n`;
        emailBody += `Keywords: ${keywords}\n\n`;
        emailBody += `Note: Please attach your full paper in PDF format to this email.\n`;
      }
      
      emailBody += `\nRegistration Date: ${new Date().toLocaleString()}\n`;
      
      // Save and return the regenerated email data
      const emailData = {
        subject: emailSubject,
        body: emailBody
      };
      
      // Save to localStorage
      localStorage.setItem('caaeEmailData', JSON.stringify(emailData));
      console.log('Email data regenerated from saved form data');
      
      return emailData;
    } catch (error) {
      console.error('Error regenerating email data from form:', error);
      return null;
    }
  };

  // Modify the proceedWithEmail function to use our robust regeneration function
  const proceedWithEmail = () => {
    try {
      // Prevent multiple clicks
      if (isEmailButtonLoading) return;
      
      // Set loading state
      setIsEmailButtonLoading(true);
      
      // Ensure all form field values are updated with the latest input values
      const updatedFields = Object.fromEntries(
        Object.entries(formData)
          .filter(([key]) => key !== 'registrationType' && key !== 'error' && key !== 'loading')
          .map(([key, field]) => {
            const fieldState = field as FieldState;
            const currentValue = inputRefs.current[key]?.value || fieldState.value;
            return [key, { 
              ...fieldState, 
              value: currentValue,
              valid: validateField(key, currentValue)
            }];
          })
      );
      
      // Update formData state with the latest values
      setFormData(prev => ({
        ...prev,
        ...updatedFields
      }));
      
      // Force save data immediately to ensure it's up to date
      const isFormDataSaved = saveFormBeforeCriticalAction();
      console.log('Form data saved before email:', isFormDataSaved);
      
      // Use our robust regeneration function instead of building the email directly
      const emailData = regenerateEmailDataFromForm();
      if (!emailData) {
        console.error('Failed to regenerate email data in proceedWithEmail');
        setIsEmailButtonLoading(false);
        alert('There was a problem preparing your email. Please try again or use the manual option.');
        return;
      }
      
      // Store email data in state
      setEmailData({
        subject: emailData.subject,
        body: emailData.body,
        copySuccess: ''
      });
      
      // Set a flag in localStorage to indicate we're in email sending mode
      localStorage.setItem('caaeEmailSending', 'true');
      
      // Get the raw email body for mailto link
      const emailBody = emailData.body.replace(/\n/g, '\r\n');

      // Check if the email body is too long (some email clients have limitations)
      if (emailBody.length > 2000) {
        // If email body is too long, show warning and don't try to open email client
        setShowEmailWarning(true);
        alert('Your email content may be too long for automatic filling. Please use the manual option to copy the email content.');
        setIsEmailButtonLoading(false);
        return;
      }

      // Properly encode the subject and body for mailto URL
      // Use encodeURIComponent for proper handling of special characters
      const encodedSubject = encodeURIComponent(emailData.subject);
      const encodedBody = encodeURIComponent(emailBody);
      
      // Create mailto URL with properly encoded components
      const mailtoURL = `mailto:${encodeURIComponent(REGISTRATION_EMAIL)}?subject=${encodedSubject}&body=${encodedBody}`;
      
      // Set a timeout to reset the loading state after 5 seconds regardless of the outcome
      setTimeout(() => {
        setIsEmailButtonLoading(false);
      }, 5000);
      
      // Show warning and instructions BEFORE opening email client
      // This ensures warning screen has the data before email client opens
      setShowEmailWarning(true);
      
      // Use a timeout to allow the UI to update before opening email client
      setTimeout(() => {
        try {
          // Create a flag to track if we've successfully opened an email client
          let emailClientOpened = false;
          
          // Create an invisible anchor element for more reliable mailto handling
          const mailtoLink = document.createElement('a');
          mailtoLink.href = mailtoURL;
          mailtoLink.style.display = 'none';
          document.body.appendChild(mailtoLink);
          
          // Try to open using the anchor click method first
          try {
            mailtoLink.click();
            emailClientOpened = true;
            console.log('Email client opened via anchor click method');
          } catch (clickError) {
            console.error('Error using anchor click method:', clickError);
          }
          
          // Clean up the anchor element
          setTimeout(() => {
            document.body.removeChild(mailtoLink);
          }, 100);
          
          // Only try fallback methods if the first method failed or if we're still on the same page
          setTimeout(() => {
            // Only attempt fallback if we're still focused on the page (indicating the email client didn't open)
            if (!emailClientOpened && document.hasFocus()) {
              console.log('Email client may not have opened, trying fallback method: window.open');
              
              // Try window.open as a fallback
              try {
                const newWindow = window.open(mailtoURL, '_blank');
                if (newWindow && !newWindow.closed) {
                  emailClientOpened = true;
                  console.log('Email client opened via window.open method');
                } else {
                  // Final fallback - only use this if nothing else worked
                  console.log('Fallback window.open failed, using location.href as last resort');
                  window.location.href = mailtoURL;
                }
              } catch (e) {
                console.error('Fallback window.open failed:', e);
                // Last resort, if we haven't opened the client yet
                if (!emailClientOpened) {
                  console.log('Using location.href as final attempt');
                  window.location.href = mailtoURL;
                }
              }
            }
          }, 500);
        } catch (e) {
          console.error('Error in all email opening attempts:', e);
          // Last resort fallback
          window.location.href = mailtoURL;
        }
      }, 300);
      
    } catch (error) {
      console.error('Error in proceedWithEmail:', error);
      setFormData(prev => ({
        ...prev,
        error: 'Failed to open email client. Please try the manual email option instead.',
        loading: false
      }));
      
      // Make sure we still have the email data for manual option
      alert('Unable to open your email client automatically. Please use the "Option 1: Manual Email" method instead.');
      
      // Reset loading state on error
      setIsEmailButtonLoading(false);
    }
  };

  // Copy email content to clipboard
  const copyToClipboard = (content: string, type: string) => {
    // Try using the modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      // Modern browser with secure context (HTTPS)
      navigator.clipboard.writeText(content)
        .then(() => {
          // Set specific success message based on what was copied
          const successMessage = `${type} Copied!`;
          setEmailData(prev => ({ ...prev, copySuccess: successMessage }));
          
          // Show success message for 2 seconds
          setTimeout(() => {
            setEmailData(prev => ({ ...prev, copySuccess: '' }));
          }, 2000);
        })
        .catch(err => {
          console.error('Could not copy text using Clipboard API: ', err);
          // Fall back to the execCommand method
          fallbackCopyToClipboard();
        });
    } else {
      // Fall back to the older document.execCommand method
      fallbackCopyToClipboard();
    }
    
    // Fallback method for older browsers or non-secure contexts
    function fallbackCopyToClipboard() {
      try {
        // Create a temporary textarea element to hold the text
        const textarea = document.createElement('textarea');
        textarea.value = content;
        
        // Make the textarea out of viewport to hide it
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';
        document.body.appendChild(textarea);
        
        // Focus and select the text
        textarea.focus();
        textarea.select();
        
        // Execute copy command
        const successful = document.execCommand('copy');
        if (successful) {
          // Set specific success message based on what was copied
          const successMessage = `${type} Copied!`;
          setEmailData(prev => ({ ...prev, copySuccess: successMessage }));
          
          // Show success message for 2 seconds
          setTimeout(() => {
            setEmailData(prev => ({ ...prev, copySuccess: '' }));
          }, 2000);
        } else {
          console.error('Copy was unsuccessful');
          setEmailData(prev => ({ ...prev, copySuccess: 'Failed to copy' }));
        }
        
        // Clean up the temporary element
        document.body.removeChild(textarea);
      } catch (err) {
        console.error('Could not copy text: ', err);
        setEmailData(prev => ({ ...prev, copySuccess: 'Failed to copy' }));
        
        // Provide instructions for manual copy if everything fails
        alert(`Please manually copy this ${type.toLowerCase()}: \n\n${content}`);
      }
    }
  };

  // Step indicator
  const StepIndicator = () => (
    <div className="mb-10">
      <div className="flex items-center justify-center">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${!showInstructions ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
          1
        </div>
        <div className={`h-1 w-24 ${showInstructions ? 'bg-primary' : 'bg-gray-200'}`}></div>
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${showInstructions ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
          2
        </div>
      </div>
      <div className="flex justify-center mt-2 text-sm">
        <div className={`w-24 text-center ${!showInstructions ? 'font-medium text-primary' : 'text-gray-500'}`}>
          Fill Info
        </div>
        <div className="w-24"></div>
        <div className={`w-24 text-center ${showInstructions ? 'font-medium text-primary' : 'text-gray-500'}`}>
          Finalize
        </div>
      </div>
    </div>
  );

  // Add a state for completed registration
  const [registrationComplete, setRegistrationComplete] = useState(false);

  // Create a helper function to synchronize form data before critical actions
  const saveFormBeforeCriticalAction = () => {
    // Create an object to store saved form data
    interface SavedFormData {
      registrationType: string;
      [key: string]: unknown;
    }
    
    const isFieldState = (obj: any): obj is FieldState => {
      return obj && typeof obj === 'object' && 'value' in obj && 'valid' in obj;
    };
    
    // Get the most current data from the form
    const dataToSave: SavedFormData = {
      registrationType: formData.registrationType
    };
    
    // Add field values directly from the DOM inputs, making sure to capture all field values
    Object.entries(formData).forEach(([key, field]) => {
      if (key !== 'registrationType' && key !== 'error' && key !== 'loading') {
        if (isFieldState(field)) {
          const currentValue = inputRefs.current[key]?.value || field.value;
          
          // Store the current DOM value for each field
          dataToSave[key] = { 
            value: currentValue,
            valid: validateField(key, currentValue)
          };
        }
      }
    });
    
    // Force synchronous save to localStorage
    localStorage.setItem('caaeRegistrationForm', JSON.stringify(dataToSave));
    localStorage.setItem('caaeEmailSending', 'true');
    
    return true;
  }

  // Add a function to reset the registration flow
  const resetRegistrationFlow = () => {
    setShowInstructions(false);
    setShowEmailWarning(false);
    
    // Clear email sending flag but keep form data
    localStorage.removeItem('caaeEmailSending');
    
    // Ensure all values from localStorage are applied to form fields
    try {
      const savedData = localStorage.getItem('caaeRegistrationForm');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        // After resetting to form view, update all input refs with the latest values
        setTimeout(() => {
          Object.keys(inputRefs.current).forEach(key => {
            const input = inputRefs.current[key];
            if (input && parsedData[key] && parsedData[key].value !== undefined) {
              input.value = parsedData[key].value;
            }
          });
        }, 0);
      }
    } catch (error) {
      console.error('Error restoring form data while resetting flow:', error);
    }
  }

  // Add a function to mark registration as complete and ONLY NOW clear data
  const completeRegistration = () => {
    // Only when the user confirms "I've Sent My Email", clear the data
    localStorage.removeItem('caaeRegistrationForm');
    localStorage.removeItem('caaeEmailSending');
    localStorage.removeItem('caaeEmailData');
    setRegistrationComplete(true);
    
    // Show a success message to confirm data has been cleared
    console.log('Registration data cleared successfully');
  };

  // Modify the handlePreview function to ensure data is saved
  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched and validate them using current values from refs
    const updatedFields = Object.fromEntries(
      Object.entries(formData)
        .filter(([key]) => key !== 'registrationType' && key !== 'error' && key !== 'loading')
        .map(([key, field]) => {
          const fieldState = field as FieldState;
          const currentValue = inputRefs.current[key]?.value || fieldState.value;
          return [key, { 
            ...fieldState, 
            value: currentValue,
            touched: true,
            valid: validateField(key, currentValue),
            errorMessage: !validateField(key, currentValue) ? (
              key === 'firstName' ? 'First name is required' : 
              key === 'lastName' ? 'Last name is required' : 
              key === 'email' ? 'Valid email address is required' : 
              key === 'birthDate' ? 'Please enter a valid date (not in the future and not too far in the past)' : 
              key === 'paperTitle' ? 'Paper title is required for speakers' : 
              key === 'paperAbstract' ? 'Abstract is required for speakers' : ''
            ) : ''
          }];
        })
    );
    
    setFormData(prev => ({
      ...prev,
      ...updatedFields
    }));
    
    // Check if form is valid
    if (isFormValid()) {
      // Force save form data before continuing
      saveFormBeforeCriticalAction();
      
      // Generate email data right away when moving to instructions screen
      // Create email subject
      const emailSubject = `CAEA Conference Registration: ${formData.registrationType === REGISTER_SPEAKER ? 'Speaker' : 'Participant'} - ${inputRefs.current.firstName?.value || ''} ${inputRefs.current.lastName?.value || ''}`;
      
      // Create email body
      let emailBody = `
Registration Type: ${formData.registrationType === REGISTER_SPEAKER ? 'Speaker' : 'Participant'}

Personal Information:
-------------------
First Name: ${inputRefs.current.firstName?.value || ''}
Last Name: ${inputRefs.current.lastName?.value || ''}
Middle Name: ${inputRefs.current.middleName?.value || 'N/A'}
Birth Date: ${inputRefs.current.birthDate?.value || 'N/A'}
Institution: ${inputRefs.current.institution?.value || 'N/A'}
Country: ${inputRefs.current.country?.value || 'N/A'}
Email: ${inputRefs.current.email?.value || ''}
Phone: ${inputRefs.current.phone?.value || 'N/A'}
`;

      // Add speaker-specific information if applicable
      if (formData.registrationType === REGISTER_SPEAKER) {
        emailBody += `
Paper Information:
----------------
Title: ${inputRefs.current.paperTitle?.value || ''}
Abstract: ${inputRefs.current.paperAbstract?.value || ''}
Co-Authors: ${inputRefs.current.coAuthors?.value || 'None'}
Keywords: ${inputRefs.current.keywords?.value || 'N/A'}

Note: Please attach your full paper in PDF format to this email.
`;
      }
      
      emailBody += `
Registration Date: ${new Date().toLocaleString()}
`;

      // Store email data in state for manual copy option
      setEmailData({
        subject: emailSubject,
        body: emailBody,
        copySuccess: ''
      });
      
      setShowInstructions(true);
    } else {
      setFormData(prev => ({
        ...prev,
        error: 'Please correct the errors in the form before continuing'
      }));
      
      // Scroll to the first error field
      setTimeout(() => {
        const firstErrorField = document.querySelector('.field-error');
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  // Modify the useEffect specifically for email warning state to use our more robust regeneration function
  useEffect(() => {
    // This effect runs when showEmailWarning changes
    if (showEmailWarning) {
      // When showing email warning, ensure we have the email data available
      try {
        // First try to get email data from localStorage
        const savedEmailData = localStorage.getItem('caaeEmailData');
        if (savedEmailData) {
          const parsedEmailData = JSON.parse(savedEmailData);
          if (parsedEmailData.subject && parsedEmailData.body) {
            // Restore from saved email data
            setEmailData({
              subject: parsedEmailData.subject,
              body: parsedEmailData.body,
              copySuccess: ''
            });
            console.log('Email data restored when showing warning screen');
            return;
          }
        }
        
        // If no email data in localStorage, try to regenerate it from form data
        const emailData = regenerateEmailDataFromForm();
        if (emailData) {
          setEmailData({
            subject: emailData.subject,
            body: emailData.body,
            copySuccess: ''
          });
          console.log('Email data regenerated for warning screen');
        } else {
          console.error('Failed to regenerate email data for warning screen');
        }
      } catch (error) {
        console.error('Error restoring email data for warning screen:', error);
      }
    }
  }, [showEmailWarning]);

  if (showInstructions) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Conference Registration
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Register for the Central Asian Economics Association Conference 2023
          </p>
        </div>
        
        <StepIndicator />
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 transform translate-y-0 hover:translate-y-[-5px]">
          <div className="bg-gradient-to-r from-primary to-secondary py-6 px-6">
            <h2 className="text-2xl font-bold text-white">Complete Your Registration</h2>
          </div>
          <div className="px-6 py-8 sm:p-8">
            <div className="text-center">
              {registrationComplete ? (
                <div className="text-center py-8">
                  <div className="mx-auto h-20 w-20 text-green-500 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon icon={FaIcons.FaCheckCircle} className="h-12 w-12" />
                  </div>
                  <h3 className="mt-4 text-2xl font-medium text-gray-900">Registration Complete!</h3>
                  <p className="mt-3 text-lg text-gray-600">
                    Thank you for registering for the CAEA Conference 2023. We'll be in touch soon!
                  </p>
                  <div className="mt-8">
                    <button
                      onClick={() => window.location.href = '/'}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Return to Home
                    </button>
                  </div>
                </div>
              ) : showEmailWarning ? (
                <div className="text-center py-6">
                  <div className="mx-auto h-20 w-20 text-yellow-500 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Icon icon={FaIcons.FaExclamationTriangle} className="h-12 w-12" />
                  </div>
                  <h3 className="mt-4 text-2xl font-medium text-gray-900">Attempting to Open Email Client</h3>
                  <p className="mt-3 text-lg text-gray-600">
                    Your email client should be opening in a new window or tab. Please check if it has opened with the registration information.
                  </p>
                  <div className="mt-6 bg-yellow-50 p-4 rounded-md text-left">
                    <p className="font-medium text-yellow-800">If your email client didn't open correctly or the email is empty/incomplete:</p>
                    <ol className="mt-2 ml-4 text-sm text-yellow-700 list-decimal">
                      <li className="mb-2">Click the "Return to Instructions" button below</li>
                      <li className="mb-2">Use the "Option 1: Manual Email" method instead (recommended)</li>
                      <li className="mb-2">Copy each section and paste into your email client manually</li>
                      <li>Return to this page after sending your email</li>
                    </ol>
                    <div className="mt-3 p-3 bg-blue-50 rounded-md text-blue-800 text-sm">
                      <strong>Common issues:</strong> 
                      <ul className="list-disc ml-4 mt-1">
                        <li>Some browsers restrict automatic email opening for security reasons</li>
                        <li>Email clients may limit the amount of text that can be auto-filled</li>
                        <li>The manual method works reliably in all cases</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Show manual email content directly in the warning screen */}
                  <div className="mt-6 bg-white p-6 rounded-lg border-2 border-green-500 shadow-md">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Manual Email Option</h4>
                    <p className="text-gray-600 mb-4">
                      Copy and paste the following details to send your registration:
                    </p>
                    
                    <div className="text-left space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium text-gray-700">Send To:</p>
                        </div>
                        <div className="flex">
                          <input 
                            type="text" 
                            readOnly 
                            value={REGISTRATION_EMAIL}
                            className="border border-gray-300 flex-grow rounded-l-md text-sm py-3 px-3 bg-gray-50"
                          />
                          <button
                            onClick={() => copyToClipboard(REGISTRATION_EMAIL, 'Email')}
                            className="bg-gray-200 hover:bg-gray-300 py-3 px-4 rounded-r-md transition-colors"
                            aria-label="Copy email address"
                            title="Copy to clipboard"
                          >
                            <Icon icon={FaIcons.FaCopy} className="h-5 w-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium text-gray-700">Subject:</p>
                        </div>
                        <div className="flex">
                          <input 
                            type="text" 
                            readOnly 
                            value={emailData.subject}
                            className="border border-gray-300 flex-grow rounded-l-md text-sm py-3 px-3 bg-gray-50"
                          />
                          <button
                            onClick={() => copyToClipboard(emailData.subject, 'Subject')}
                            className="bg-gray-200 hover:bg-gray-300 py-3 px-4 rounded-r-md transition-colors"
                            aria-label="Copy subject"
                            title="Copy to clipboard"
                          >
                            <Icon icon={FaIcons.FaCopy} className="h-5 w-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium text-gray-700">Email Body:</p>
                        </div>
                        <div className="relative">
                          <textarea
                            readOnly
                            rows={6}
                            value={emailData.body}
                            className="w-full border border-gray-300 rounded-md text-sm py-3 px-3 bg-gray-50"
                          />
                          <button
                            onClick={() => copyToClipboard(emailData.body, 'Body')}
                            className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 p-3 rounded-md transition-colors shadow-sm"
                            aria-label="Copy email body"
                            title="Copy to clipboard"
                          >
                            <Icon icon={FaIcons.FaCopy} className="h-5 w-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        // When returning to instructions, make sure we regenerate the email data
                        // from the form data if it's been lost
                        setShowEmailWarning(false);
                        setIsEmailButtonLoading(false); // Reset button state
                        
                        // First try to get email data from localStorage
                        try {
                          const savedEmailData = localStorage.getItem('caaeEmailData');
                          if (savedEmailData) {
                            const parsedEmailData = JSON.parse(savedEmailData);
                            if (parsedEmailData.subject && parsedEmailData.body) {
                              // Restore from saved email data
                              setEmailData({
                                subject: parsedEmailData.subject,
                                body: parsedEmailData.body,
                                copySuccess: ''
                              });
                              console.log('Restored email data from localStorage when returning from warning');
                              return;
                            }
                          }
                        } catch (error) {
                          console.error('Error retrieving email data from localStorage:', error);
                        }
                        
                        // Double-check if email data is empty, regenerate it from form values if needed
                        if (!emailData.subject || !emailData.body) {
                          try {
                            // Get values from form data
                            const firstName = formData.firstName.value;
                            const lastName = formData.lastName.value;
                            const middleName = formData.middleName.value || 'N/A';
                            const birthDate = formData.birthDate.value || 'N/A';
                            const institution = formData.institution.value || 'N/A';
                            const country = formData.country.value || 'N/A';
                            const email = formData.email.value || '';
                            const phone = formData.phone.value || 'N/A';
                            
                            // Regenerate email subject
                            const emailSubject = `CAEA Conference Registration: ${formData.registrationType === REGISTER_SPEAKER ? 'Speaker' : 'Participant'} - ${firstName} ${lastName}`;
                            
                            // Regenerate email body
                            let emailBody = `Registration Type: ${formData.registrationType === REGISTER_SPEAKER ? 'Speaker' : 'Participant'}\n\n`;
                            emailBody += `Personal Information:\n`;
                            emailBody += `-------------------\n`;
                            emailBody += `First Name: ${firstName}\n`;
                            emailBody += `Last Name: ${lastName}\n`;
                            emailBody += `Middle Name: ${middleName}\n`;
                            emailBody += `Birth Date: ${birthDate}\n`;
                            emailBody += `Institution: ${institution}\n`;
                            emailBody += `Country: ${country}\n`;
                            emailBody += `Email: ${email}\n`;
                            emailBody += `Phone: ${phone}\n`;
                            
                            // Add speaker-specific information if applicable
                            if (formData.registrationType === REGISTER_SPEAKER) {
                              emailBody += `\nPaper Information:\n`;
                              emailBody += `----------------\n`;
                              emailBody += `Title: ${formData.paperTitle.value || ''}\n`;
                              emailBody += `Abstract: ${formData.paperAbstract.value || ''}\n`;
                              emailBody += `Co-Authors: ${formData.coAuthors.value || 'None'}\n`;
                              emailBody += `Keywords: ${formData.keywords.value || 'N/A'}\n\n`;
                              emailBody += `Note: Please attach your full paper in PDF format to this email.\n`;
                            }
                            
                            emailBody += `\nRegistration Date: ${new Date().toLocaleString()}\n`;
                            
                            // Restore email data
                            setEmailData({
                              subject: emailSubject,
                              body: emailBody,
                              copySuccess: ''
                            });
                            
                            // Save the regenerated email data to localStorage
                            localStorage.setItem('caaeEmailData', JSON.stringify({
                              subject: emailSubject,
                              body: emailBody
                            }));
                            
                            console.log('Email data regenerated after returning from warning screen');
                          } catch (error) {
                            console.error('Error regenerating email data:', error);
                          }
                        }
                      }}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Return to Instructions
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mx-auto h-20 w-20 text-primary bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                    <Icon icon={FaIcons.FaPaperPlane} className="h-10 w-10 text-primary" />
                  </div>
                  
                  <h3 className="mt-4 text-2xl font-medium text-gray-900">Email Registration Instructions</h3>
                  <p className="mt-3 text-lg text-gray-600">
                    You can complete your registration by sending an email to us in two ways:
                  </p>
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-1 gap-8">
                    {/* Option 1: Manual Email - Most reliable method */}
                    <div className="bg-white p-6 rounded-lg border-2 border-green-500 shadow-md">
                      <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <Icon icon={FaIcons.FaCopy} className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Option 1: Manual Email (Recommended)</h4>
                      <p className="text-gray-600 mb-6">Copy the details below and send from your preferred email service.</p>
                      
                      <div className="text-left space-y-5">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium text-gray-700">Send To:</p>
                            {emailData.copySuccess === 'Email Copied!' && (
                              <span className="text-xs bg-green-100 text-green-600 font-medium px-2 py-1 rounded-full">✓ Copied!</span>
                            )}
                          </div>
                          <div className="flex">
                            <input 
                              type="text" 
                              readOnly 
                              value={REGISTRATION_EMAIL}
                              className="border border-gray-300 flex-grow rounded-l-md text-sm py-3 px-3 bg-gray-50"
                            />
                            <button
                              onClick={() => copyToClipboard(REGISTRATION_EMAIL, 'Email')}
                              className="bg-gray-200 hover:bg-gray-300 py-3 px-4 rounded-r-md transition-colors"
                              aria-label="Copy email address"
                              title="Copy to clipboard"
                            >
                              <Icon icon={FaIcons.FaCopy} className="h-5 w-5 text-gray-600" />
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium text-gray-700">Subject:</p>
                            {emailData.copySuccess === 'Subject Copied!' && (
                              <span className="text-xs bg-green-100 text-green-600 font-medium px-2 py-1 rounded-full">✓ Copied!</span>
                            )}
                          </div>
                          <div className="flex">
                            <input 
                              type="text" 
                              readOnly 
                              value={emailData.subject}
                              className="border border-gray-300 flex-grow rounded-l-md text-sm py-3 px-3 bg-gray-50"
                            />
                            <button
                              onClick={() => copyToClipboard(emailData.subject, 'Subject')}
                              className="bg-gray-200 hover:bg-gray-300 py-3 px-4 rounded-r-md transition-colors"
                              aria-label="Copy subject"
                              title="Copy to clipboard"
                            >
                              <Icon icon={FaIcons.FaCopy} className="h-5 w-5 text-gray-600" />
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium text-gray-700">Email Body:</p>
                            {emailData.copySuccess === 'Body Copied!' && (
                              <span className="text-xs bg-green-100 text-green-600 font-medium px-2 py-1 rounded-full">✓ Copied!</span>
                            )}
                          </div>
                          <div className="relative">
                            <textarea
                              readOnly
                              rows={10}
                              value={emailData.body}
                              className="w-full border border-gray-300 rounded-md text-sm py-3 px-3 bg-gray-50 min-h-[200px]"
                            />
                            <button
                              onClick={() => copyToClipboard(emailData.body, 'Body')}
                              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 p-3 rounded-md transition-colors shadow-sm"
                              aria-label="Copy email body"
                              title="Copy to clipboard"
                            >
                              <Icon icon={FaIcons.FaCopy} className="h-5 w-5 text-gray-600" />
                            </button>
                          </div>
                        </div>
                        
                        {formData.registrationType === REGISTER_SPEAKER && (
                          <div className="p-4 bg-yellow-50 rounded-md text-sm text-yellow-700 flex items-start">
                            <Icon icon={FaIcons.FaExclamationTriangle} className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                            <div>
                              <strong>Important:</strong> Don't forget to attach your paper in PDF format to your email.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Option 2: Auto Email Client */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mt-3">
                      <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Icon icon={FaIcons.FaEnvelope} className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Option 2: Automatic Email</h4>
                      <p className="text-gray-600 mb-6">Try opening your default email client with pre-filled message. <span className="text-red-600 font-medium">(May not work on all systems)</span></p>
                      
                      <div className="mt-2 text-left bg-gray-50 p-4 rounded-lg shadow-inner mb-6">
                        <p className="font-medium text-gray-800 mb-2">Steps:</p>
                        <ol className="ml-4 text-gray-700 list-decimal space-y-2 text-sm">
                          <li>Click the button below</li>
                          <li>Your email client will open with pre-filled details</li>
                          {formData.registrationType === REGISTER_SPEAKER && (
                            <li className="font-medium text-primary">Attach your full paper in PDF format</li>
                          )}
                          <li>Click send to complete registration</li>
                        </ol>
                      </div>
                      
                      <button
                        type="button"
                        onClick={proceedWithEmail}
                        disabled={isEmailButtonLoading}
                        className={`w-full inline-flex justify-center items-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${isEmailButtonLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
                      >
                        {isEmailButtonLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Opening Email...
                          </>
                        ) : (
                          <>
                            Try Automatic Email
                            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                          </>
                        )}
                      </button>
                      
                      <p className="mt-3 text-xs text-gray-500 text-center">If this doesn't work, please reload the page and use Option 1 above.</p>
                    </div>
                  </div>
                  
                  {/* Add a confirmation button to mark registration as complete */}
                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <p className="text-gray-600 mb-4">After sending your email, please click the button below to complete the process:</p>
                    <button
                      type="button"
                      onClick={completeRegistration}
                      className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    >
                      <Icon icon={FaIcons.FaCheckCircle} className="mr-2 h-5 w-5" />
                      I've Sent My Email
                    </button>
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() => resetRegistrationFlow()}
                      className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                    >
                      <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                      </svg>
                      Back to Form
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Conference Registration
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
          Register for the Central Asian Economics Association Conference 2023
        </p>
      </div>
      
      <StepIndicator />

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary py-6 px-6">
          <h2 className="text-2xl font-bold text-white">Registration Form</h2>
          <p className="text-white text-opacity-80 mt-1">Please complete all required fields marked with *</p>
        </div>
        
        <div className="px-4 py-6 sm:p-8">
          <form 
            onSubmit={(e) => {
              e.preventDefault(); // Always prevent default submission
              handlePreview(e);
            }}
            onClick={(e) => {
              // Prevent any clicks from bubbling up to parent elements
              e.stopPropagation();
            }}
            onKeyDown={(e) => {
              // Prevent form submission on Enter key
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
          >
            {/* Registration Type */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Registration Type <span className="text-red-500">*</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label 
                  className={`flex cursor-pointer ${formData.registrationType === REGISTER_PARTICIPANT 
                    ? 'bg-primary-50 border-primary' 
                    : 'bg-white border-gray-200'} 
                    border-2 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200`}
                >
                  <input
                    type="radio"
                    name="registrationType"
                    value={REGISTER_PARTICIPANT}
                    checked={formData.registrationType === REGISTER_PARTICIPANT}
                    onChange={handleRegistrationTypeChange}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${formData.registrationType === REGISTER_PARTICIPANT ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <Icon icon={FaIcons.FaUser} className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h4 className={`text-base font-medium ${formData.registrationType === REGISTER_PARTICIPANT ? 'text-primary' : 'text-gray-900'}`}>Participant</h4>
                      <p className="text-sm text-gray-500">Attend the conference only</p>
                    </div>
                  </div>
                </label>
                <label 
                  className={`flex cursor-pointer ${formData.registrationType === REGISTER_SPEAKER 
                    ? 'bg-primary-50 border-primary' 
                    : 'bg-white border-gray-200'} 
                    border-2 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200`}
                >
                  <input
                    type="radio"
                    name="registrationType"
                    value={REGISTER_SPEAKER}
                    checked={formData.registrationType === REGISTER_SPEAKER}
                    onChange={handleRegistrationTypeChange}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${formData.registrationType === REGISTER_SPEAKER ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <Icon icon={FaIcons.FaMicrophone} className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h4 className={`text-base font-medium ${formData.registrationType === REGISTER_SPEAKER ? 'text-primary' : 'text-gray-900'}`}>Speaker</h4>
                      <p className="text-sm text-gray-500">Present research paper</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Personal Information</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <FormField 
                    label="First Name" 
                    name="firstName" 
                    required={true} 
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormField 
                    label="Last Name" 
                    name="lastName" 
                    required={true} 
                    placeholder="Enter your last name"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormField 
                    label="Middle Name" 
                    name="middleName" 
                    placeholder="Optional"
                  />
                </div>

                <div className="sm:col-span-3">
                  <FormField 
                    label="Birth Date" 
                    name="birthDate" 
                    type="date"
                  />
                </div>

                <div className="sm:col-span-3">
                  <FormField 
                    label="Email Address" 
                    name="email" 
                    type="email"
                    required={true} 
                    placeholder="your.email@example.com"
                    tooltip="We'll use this email to send you conference information"
                  />
                </div>

                <div className="sm:col-span-3">
                  <FormField 
                    label="Phone Number" 
                    name="phone" 
                    type="tel"
                    placeholder="International format (e.g. +1 123 456 7890)"
                  />
                </div>

                <div className="sm:col-span-3">
                  <FormField 
                    label="Institution/Organization" 
                    name="institution" 
                    placeholder="University or company name"
                  />
                </div>

                <div className="sm:col-span-3">
                  <FormField 
                    label="Country" 
                    name="country" 
                    placeholder="Your country of residence"
                  />
                </div>
              </div>
            </div>

            {/* Speaker-specific fields */}
            {formData.registrationType === REGISTER_SPEAKER && (
              <div className="mt-10">
                <h3 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center">
                  <Icon icon={FaIcons.FaFileAlt} className="mr-2 text-primary" />
                  Paper Information
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <FormField 
                      label="Paper Title" 
                      name="paperTitle" 
                      required={true} 
                      placeholder="Enter the title of your research paper"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <FormField 
                      label="Abstract" 
                      name="paperAbstract" 
                      type="textarea"
                      rows={4}
                      required={true} 
                      placeholder="Provide a brief summary of your paper (250-300 words)"
                      tooltip="A good abstract should include your research question, methodology, key findings, and significance"
                    />
                    <p className="mt-2 text-sm text-gray-500">Brief summary of your paper (250-300 words)</p>
                  </div>

                  <div className="sm:col-span-6">
                    <FormField 
                      label="Co-Authors" 
                      name="coAuthors" 
                      placeholder="Separate names with commas"
                      tooltip="List all co-authors in the format: First Name Last Name, First Name Last Name"
                    />
                    <p className="mt-2 text-sm text-gray-500">Separate names with commas</p>
                  </div>

                  <div className="sm:col-span-6">
                    <FormField 
                      label="Keywords" 
                      name="keywords" 
                      placeholder="e.g., Economics, Finance, Central Asia"
                    />
                    <p className="mt-2 text-sm text-gray-500">Separate keywords with commas</p>
                  </div>
                  
                  <div className="sm:col-span-6">
                    <div className="rounded-md bg-yellow-50 p-4 shadow-sm">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <p>You will need to attach your full paper (PDF format) to the email that will be generated after submitting this form.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {formData.error && (
              <div className="mt-6 text-red-600 text-sm p-3 bg-red-50 rounded-md">
                <div className="flex">
                  <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {formData.error}
                </div>
              </div>
            )}

            {/* Submit button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={formData.loading}
                className={`inline-flex justify-center items-center py-3 px-6 border border-transparent text-base font-medium rounded-md shadow-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 ${formData.loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {formData.loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Continue to Email
                    <Icon icon={FaIcons.FaArrowRight} className="ml-2" />
                  </span>
                )}
              </button>
            </div>
            
            {/* Auto-save indicator */}
            <div className="mt-4 flex justify-center text-sm text-gray-500">
              <div className="flex items-center">
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Saving your changes...</span>
                  </>
                ) : (
                  <>
                    <Icon icon={FaIcons.FaCheck} className="h-4 w-4 text-green-500 mr-2" />
                    <span>Your data is saved automatically</span>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register; 