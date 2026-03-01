import { Link } from 'react-router-dom';
import './Terms.css';

function Terms() {
  return (
    <div className="terms-page">
      <div className="terms-content">
        <h1>Terms & Conditions</h1>
        <p><strong>Last Updated: March 2026</strong></p>
        <p>Welcome to Koodaram. By accessing and using this website, you agree to be bound by the following terms and conditions. If you do not agree with any part of these terms, please do not use our platform.</p>

        <h2>1. About Koodaram</h2>
        <p>Koodaram is a student-driven, community-supported platform designed to help students discover and explore hostel listings. We are not affiliated with, endorsed by, or representing any hostel owner or operator. Koodaram does not own, operate, manage, or control any of the hostels featured on this platform. We serve as an information aggregator and community platform supported by student unions and educational institutions.</p>

        <h2>2. Data Sources</h2>
        <p>The hostel information displayed on Koodaram is sourced from publicly available data, including but not limited to public directories, review sites, online listings, and user-submitted content. Our use of such publicly available information is in compliance with applicable laws and regulations. We do not scrape or access non-public data without authorization.</p>

        <h2>3. Accuracy & Disclaimer</h2>
        <p>While we strive to maintain accurate and current information, we cannot guarantee the complete accuracy, timeliness, or completeness of all hostel details including prices, amenities, room availability, contact information, or location details. Hostel information may change frequently and without notice.</p>
        <p><strong>You must independently verify all information directly with the hostel before making any decisions or commitments.</strong> Relying solely on Koodaram's information may result in outdated or incorrect data. Always contact the hostel directly to confirm current details.</p>

        <h2>4. User Responsibility & Liability</h2>
        <p>You acknowledge that using Koodaram is at your own risk. You are solely responsible for:</p>
        <ul>
          <li>Evaluating the suitability of any hostel for your needs</li>
          <li>Verifying all information independently</li>
          <li>Conducting your own due diligence before booking or visiting</li>
          <li>Communicating directly with hostel owners to clarify any concerns</li>
          <li>Reading hostel policies, reviews, and ratings before making decisions</li>
        </ul>
        <p><strong>Koodaram shall not be liable for:</strong> inaccurate information, unexpected price changes, unavailable rooms, poor hostel conditions, disputes with hostel owners, financial losses, property damage, personal injury, or any other issues arising from your interaction with hostels or hostel owners. Koodaram is provided on an "as-is" basis without warranties or guarantees.</p>

        <h2>5. Content & Data Ownership</h2>
        <p><strong>Hostel Listings:</strong> Hostel listings, images, and descriptions are sourced from publicly available data or user submissions. If you are a hostel owner and believe your data is being used incorrectly or would like your listing removed, updated, or corrected, please contact us immediately.</p>
        <p><strong>User-Generated Content:</strong> By submitting content to Koodaram (reviews, images, comments), you grant us a non-exclusive license to use, modify, and distribute such content on our platform. You represent that you own or have permission to use the content you submit.</p>
        <p><strong>Koodaram Intellectual Property:</strong> All original content, design, functionality, and branding of Koodaram are owned by or licensed to Koodaram and are protected by copyright and intellectual property laws. You may not reproduce, distribute, or modify our content without permission.</p>

        <h2>6. Hostel Owner Rights</h2>
        <p>If you are a hostel owner, you have the right to:</p>
        <ul>
          <li>Request verification of your listing accuracy</li>
          <li>Request corrections or updates to your listing</li>
          <li>Request removal of your listing from our platform</li>
          <li>Request removal of inaccurate reviews or content</li>
        </ul>
        <p>To exercise these rights, please contact us with appropriate documentation. We will respond to verified requests promptly.</p>

        <h2>7. User Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Submit false, misleading, or defamatory reviews</li>
          <li>Harass, threaten, or abuse hostel owners or other users</li>
          <li>Engage in discriminatory behavior</li>
          <li>Attempt to hack, manipulate, or disrupt the platform</li>
          <li>Spam or post promotional content without authorization</li>
          <li>Use the platform for illegal activities</li>
        </ul>

        <h2>8. Data & Privacy</h2>
        <p>Any personal information you provide is used to improve our service and communicate with you. We do not sell your data to third parties. For full details, please refer to our <Link to="/privacy">Privacy Policy</Link>.</p>

        <h2>9. Limitation of Liability</h2>
        <p><strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, KOODARAM SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF OR INABILITY TO USE THIS PLATFORM, EVEN IF KOODARAM HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</strong></p>

        <h2>10. Third-Party Links</h2>
        <p>Koodaram may contain links to external websites and resources. We are not responsible for the content, accuracy, or practices of third-party websites. Use external links at your own discretion.</p>

        <h2>11. Student Union Support</h2>
        <p>Koodaram is supported by student unions and educational institutions. This support helps us maintain the platform as a free, student-accessible resource. However, such support does not imply endorsement of every hostel listed or responsibility for hostel services.</p>

        <h2>12. Modifications to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Changes become effective immediately upon posting to this page. Your continued use of Koodaram following any changes constitutes your acceptance of the new terms. We encourage you to review these terms regularly.</p>

        <h2>13. Governing Law</h2>
        <p>These Terms & Conditions are governed by the laws of India. Any disputes arising from your use of Koodaram shall be subject to the exclusive jurisdiction of the courts in India.</p>

        <h2>14. Contact Us</h2>
        <p>If you have questions about these terms, need to report a hostel listing issue, or wish to request removal of your information, please contact us.</p>

        <footer className="terms-footer">
          <p>Thank you for being part of the Koodaram community! 🏕️</p>
          <p><Link to="/">← Back to Home</Link></p>
        </footer>
      </div>
    </div>
  );
}

export default Terms;
