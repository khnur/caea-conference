import React from 'react';

const CodeOfConduct: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Code of Conduct
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
          Our commitment to creating a respectful and inclusive conference environment
        </p>
      </div>

      <div className="prose prose-lg max-w-4xl mx-auto">
        <h2>Our Pledge</h2>
        <p>
          In the interest of fostering an open and welcoming environment, we as organizers, speakers, participants, and sponsors of the CAEA Conference pledge to make participation in our conference a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.
        </p>

        <h2>Expected Behavior</h2>
        <p>We expect all conference participants to:</p>
        <ul>
          <li>Be considerate, respectful, and collaborative.</li>
          <li>Refrain from demeaning, discriminatory, or harassing behavior and speech.</li>
          <li>Be mindful of your surroundings and of your fellow participants.</li>
          <li>Participate in an authentic and active way, contributing to the health and longevity of the community.</li>
          <li>Exercise consideration and respect in your speech and actions.</li>
          <li>Attempt collaboration before conflict.</li>
          <li>Refrain from unacceptable behavior (see next section).</li>
          <li>Alert conference organizers if you notice a dangerous situation, someone in distress, or violations of this Code of Conduct, even if they seem inconsequential.</li>
        </ul>

        <h2>Unacceptable Behavior</h2>
        <p>Unacceptable behaviors include, but are not limited to:</p>
        <ul>
          <li>Intimidating, harassing, abusive, discriminatory, derogatory, or demeaning speech or actions.</li>
          <li>Harmful or prejudicial verbal or written comments or visual images related to gender, sexual orientation, race, religion, disability, or other personal characteristics.</li>
          <li>Inappropriate use of nudity and/or sexual images in public spaces (including presentation slides).</li>
          <li>Deliberate intimidation, stalking, or following.</li>
          <li>Harassing photography or recording.</li>
          <li>Sustained disruption of talks or other events.</li>
          <li>Unwelcome sexual attention or advances.</li>
          <li>Advocating for, or encouraging, any of the above behavior.</li>
          <li>Other conduct which could reasonably be considered inappropriate in a professional setting.</li>
        </ul>

        <h2>Academic Integrity</h2>
        <p>
          The CAEA Conference is committed to the highest standards of academic integrity. All research presented at the conference should adhere to ethical research practices, including:
        </p>
        <ul>
          <li>Properly acknowledging the work of others through appropriate citations.</li>
          <li>Ensuring that data presented is accurate and has been collected and analyzed ethically.</li>
          <li>Disclosing any potential conflicts of interest.</li>
          <li>Respecting confidentiality where appropriate.</li>
          <li>Not engaging in plagiarism, data fabrication, or other forms of academic misconduct.</li>
        </ul>

        <h2>Consequences of Unacceptable Behavior</h2>
        <p>
          Unacceptable behavior from any conference participant, including sponsors, speakers, organizers, volunteers, or attendees, will not be tolerated. Anyone asked to stop unacceptable behavior is expected to comply immediately.
        </p>
        <p>
          If a participant engages in unacceptable behavior, the conference organizers may take any action they deem appropriate, including:
        </p>
        <ul>
          <li>A verbal or written warning.</li>
          <li>Expulsion from the conference without refund.</li>
          <li>Reporting to appropriate authorities if necessary.</li>
          <li>Barring from future CAEA events.</li>
        </ul>

        <h2>Reporting Process</h2>
        <p>
          If you are subject to or witness unacceptable behavior, or have any other concerns, please notify a conference organizer as soon as possible. All reports will be handled with discretion and confidentiality.
        </p>
        <p>
          Conference staff can be identified by their "ORGANIZER" badges and will be available throughout the event. You can also report incidents through the following channels:
        </p>
        <ul>
          <li>In-person: Visit the registration desk and ask to speak with the Conference Chair or a member of the Ethics Committee.</li>
          <li>Email: Send a report to conduct@caeaconference.org.</li>
          <li>Phone: Call the dedicated ethics hotline at +7 (7172) 123-4599.</li>
        </ul>
        <p>
          When reporting an incident, please include as much information as possible: your contact information, names of individuals involved, witnesses, location, date/time, and a description of what occurred. All reports will be investigated promptly.
        </p>

        <h2>Scope</h2>
        <p>
          This Code of Conduct applies to all conference venues and events, including the main conference, workshops, social events, and online communications related to the conference. It also applies to unacceptable behavior occurring outside the scope of conference activities when such behavior has the potential to adversely affect the safety and well-being of conference participants.
        </p>

        <h2>Contact Information</h2>
        <p>
          For any questions or concerns regarding this Code of Conduct, please contact:
        </p>
        <ul>
          <li>Dr. Gulnara Abdullayeva, Ethics Committee Chair</li>
          <li>Email: conduct@caeaconference.org</li>
          <li>Phone: +7 (7172) 123-4599</li>
        </ul>

        <p className="text-sm italic mt-8">
          This Code of Conduct is adapted from the <a href="https://confcodeofconduct.com/" className="text-primary hover:text-secondary">Conference Code of Conduct</a> and the <a href="https://www.contributor-covenant.org/" className="text-primary hover:text-secondary">Contributor Covenant</a>, and is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/" className="text-primary hover:text-secondary">Creative Commons Attribution 3.0 Unported License</a>.
        </p>
      </div>

      {/* Reporting Button */}
      <div className="mt-12 text-center">
        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          Report an Incident
        </button>
      </div>
    </div>
  );
};

export default CodeOfConduct; 