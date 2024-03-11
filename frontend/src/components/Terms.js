import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions for GabAi Web Application</h1>
      <ol className="list-decimal pl-6 mb-4">
        <li>
          Acceptance of Terms<br />
          By accessing and using the GabAi web application ("the Application"), you agree to be bound by these Terms and Conditions.
          If you do not agree with any part of these terms, you should not use the Application.
        </li>
        <li>
          User Accounts<br />
          a. User Roles:<br />
          GabAi provides three distinct user roles:<br />
          Administrator: Manages the application, users, and data.<br />
          Public Attorney: Provides legal guidance and support to users.<br />
          Filipino Worker: Seeks information and legal guidance on workplace discrimination issues.<br /><br />

          b. Account Security:<br />
          Users are responsible for maintaining the confidentiality of their account credentials.<br />
          In case of forgotten accounts, users can recover access using their registered mobile numbers.
        </li>
        <li>
          Application Usage<br />
          a. Legal Framework:<br />
          GabAi must comply with Philippine labor codes and anti-discrimination laws.<br />
          GabAi is designed to address workplace discrimination issues based on Philippine legal principles.<br /><br />

          b. Chat Interface:<br />
          Users engage in real-time text-based conversations with GabAi for information and legal guidance.<br />
          GabAi uses GPT-3.5 technology to provide informative and helpful responses.
        </li>
        <li>
          Data Security and Privacy<br />
          a. User Data:<br />
          GabAi ensures the secure storage of user data in a cloud database.<br />
          The application adheres to security compliance measures and data privacy principles.
        </li>
        <li>
          Application Features<br />
          a. Workplace Discrimination:<br />
          GabAi deals with cases qualifying as workplace discrimination based on defined criteria within Philippine law.<br />
          The application uses the Random Forest algorithm to analyze user data and classify cases accurately.<br /><br />

          b. Legal Consultation:<br />
          Users can request legal consultation by submitting a form request.<br />
          GabAi connects users with public attorneys who can provide legal advice and support.
        </li>
        <li>
          Application Limitations<br />
          a. Internet Connection:<br />
          GabAi requires an internet connection for proper functionality.<br /><br />

          b. Language:<br />
          The application is currently designed for English-language use. Future versions may support additional languages.<br /><br />

          c. Geographical Accessibility:<br />
          GabAi's services are currently limited to the Philippines. Future expansion to other countries may be considered.
        </li>
        <li>
          Intellectual Property<br />
          a. Ownership:<br />
          GabAi's intellectual property, including but not limited to software, design, and content, is owned by PARAGON.
        </li>
        <li>
         User Feedback<br/>
         a.User Feedback: <br/>
         Users are encouraged to provide feedback on the GabAi system to enhance its accuracy, usefulness, and accessibility.
       </li> 
       <li> 
         Modification of Terms<br/>
         a.Changes: <br/>
         PARAGON reserves the right to modify these Terms and Conditions at any time without prior notice.<br/>
         Users are responsible for regularly reviewing these terms to stay informed of any changes.
       </li>
       <li> 
         Disclaimer of Liability<br/>
         a.No Warranty: <br/>
         The Application is provided "as is" without warranties of any kind.<br/>
         PARAGON is not liable for any damages resulting from the use of the Application.
       </li>
       <li> 
         Governing Law<br/>
         a.Jurisdiction: <br/>
         These Terms and Conditions are governed by the laws of the Republic of the Philippines.
       </li>
      </ol>

      <p className="mt-8">
        Contact Information<br />
        For any inquiries regarding these Terms and Conditions, please contact team.paragon.ucc2020@gmail.com.
      </p>
    </div>
  );
};

export default TermsAndConditions;