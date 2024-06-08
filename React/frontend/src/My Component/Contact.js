import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission

  useEffect(() => {
    // Generate code when the component mounts
    generateCode('USA');
  }, []);

  const generateCode = (country) => {
    let code = '';
    switch (country) {
      case 'USA':
        code = '+1';
        break;
      case 'Canada':
        code = '+1';
        break;
        case 'Afghanistan':
          code = '+93';
          break;
        case 'Albania':
          code = '+355';
          break;
        case 'Algeria':
          code = '+213';
          break;
        case 'Andorra':
          code = '+376';
          break;
        case 'Angola':
          code = '+244';
          break;
        case 'Antigua_and_Barbuda':
          code = '+1 268';
          break;
        case 'Argentina':
          code = '+54';
          break;
        case 'Armenia':
          code = '+374';
          break;
        case 'Australia':
          code = '+61';
          break;
        case 'Austria':
          code = '+43';
          break;
        case 'Azerbaijan':
          code = '+994';
          break;
        case 'Bahamas':
          code = '+1 242';
          break;
        case 'Bahrain':
          code = '+973';
          break;
        case 'Bangladesh':
          code = '+880';
          break;
        case 'Barbados':
          code = '+1 246';
          break;
        case 'Belarus':
          code = '+375';
          break;
        case 'Belgium':
          code = '+32';
          break;
        case 'Belize':
          code = '+501';
          break;
        case 'Benin':
          code = '+229';
          break;
        case 'Bhutan':
          code = '+975';
          break;
        case 'Bolivia':
          code = '+591';
          break;
        case 'Bosnia_and_Herzegovina':
          code = '+387';
          break;
        case 'Botswana':
          code = '+267';
          break;
        case 'Brazil':
          code = '+55';
          break;
        case 'Brunei':
          code = '+673';
          break;
        case 'Bulgaria':
          code = '+359';
          break;
        case 'Burkina_Faso':
          code = '+226';
          break;
        case 'Burundi':
          code = '+257';
          break;
        case 'Cabo_Verde':
          code = '+238';
          break;
        case 'Cambodia':
          code = '+855';
          break;
        case 'Cameroon':
          code = '+237';
          break;
        case 'Canada':
          code = '+1';
          break;
        case 'Central_African_Republic':
          code = '+236';
          break;
        case 'Chad':
          code = '+235';
          break;
        case 'Chile':
          code = '+56';
          break;
        case 'China':
          code = '+86';
          break;
        case 'Colombia':
          code = '+57';
          break;
        case 'Comoros':
          code = '+269';
          break;
        case 'Congo_Democratic_Republic_of_the':
          code = '+243';
          break;
        case 'Congo_Republic_of_the':
          code = '+242';
          break;
        case 'Costa_Rica':
          code = '+506';
          break;
        case 'Croatia':
          code = '+385';
          break;
        case 'Cuba':
          code = '+53';
          break;
        case 'Cyprus':
          code = '+357';
          break;
        case 'Czech_Republic':
          code = '+420';
          break;
        case 'Denmark':
          code = '+45';
          break;
        case 'Djibouti':
          code = '+253';
          break;
        case 'Dominica':
          code = '+1 767';
          break;
        case 'Dominican_Republic':
          code = '+1 809';
          break;
        case 'Ecuador':
          code = '+593';
          break;
        case 'Egypt':
          code = '+20';
          break;
        case 'El_Salvador':
          code = '+503';
          break;
        case 'Equatorial_Guinea':
          code = '+240';
          break;
        case 'Eritrea':
          code = '+291';
          break;
        case 'Estonia':
          code = '+372';
          break;
        case 'Eswatini':
          code = '+268';
          break;
        case 'Ethiopia':
          code = '+251';
          break;
        case 'Fiji':
          code = '+679';
          break;
        case 'Finland':
          code = '+358';
          break;
        case 'France':
          code = '+33';
          break;
        case 'Gabon':
          code = '+241';
          break;
        case 'Gambia':
          code = '+220';
          break;
        case 'Georgia':
          code = '+995';
          break;
        case 'Germany':
          code = '+49';
          break;
        case 'Ghana':
          code = '+233';
          break;
        case 'Greece':
          code = '+30';
          break;
        case 'Grenada':
          code = '+1 473';
          break;
        case 'Guatemala':
          code = '+502';
          break;
        case 'Guinea':
          code = '+224';
          break;
        case 'Guinea_Bissau':
          code = '+245';
          break;
        case 'Guyana':
          code = '+592';
          break;
        case 'Haiti':
          code = '+509';
          break;
        case 'Honduras':
          code = '+504';
          break;
        case 'Hungary':
          code = '+36';
          break;
        case 'Iceland':
          code = '+354';
          break;
        case 'India':
          code = '+91';
          break;
        case 'Indonesia':
          code = '+62';
          break;
        case 'Iran':
          code = '+98';
          break;
        case 'Iraq':
          code = '+964';
          break;
        case 'Ireland':
          code = '+353';
          break;
        case 'Israel':
          code = '+972';
          break;
        case 'Italy':
          code = '+39';
          break;
        case 'Jamaica':
          code = '+1 876';
          break;
        case 'Japan':
          code = '+81';
          break;
        case 'Jordan':
          code = '+962';
          break;
        case 'Kazakhstan':
          code = '+7';
          break;
        case 'Kenya':
          code = '+254';
          break;
        case 'Kiribati':
          code = '+686';
          break;
        case 'Korea_North':
          code = '+850';
          break;
        case 'Korea_South':
          code = '+82';
          break;
        case 'Kosovo':
          code = '+383';
          break;
        case 'Kuwait':
          code = '+965';
          break;
        case 'Kyrgyzstan':
          code = '+996';
          break;
        case 'Laos':
          code = '+856';
          break;
          case 'Latvia':
            code = '+371';
            break;
          case 'Lebanon':
            code = '+961';
            break;
          case 'Lesotho':
            code = '+266';
            break;
          case 'Liberia':
            code = '+231';
            break;
          case 'Libya':
            code = '+218';
            break;
          case 'Liechtenstein':
            code = '+423';
            break;
          case 'Lithuania':
            code = '+370';
            break;
          case 'Luxembourg':
            code = '+352';
            break;
          case 'Madagascar':
            code = '+261';
            break;
          case 'Malawi':
            code = '+265';
            break;
          case 'Malaysia':
            code = '+60';
            break;
          case 'Maldives':
            code = '+960';
            break;
          case 'Mali':
            code = '+223';
            break;
          case 'Malta':
            code = '+356';
            break;
          case 'Marshall Islands':
            code = '+692';
            break;
          case 'Mauritania':
            code = '+222';
            break;
          case 'Mauritius':
            code = '+230';
            break;
          case 'Mexico':
            code = '+52';
            break;
          case 'Micronesia':
            code = '+691';
            break;
          case 'Moldova':
            code = '+373';
            break;
          case 'Monaco':
            code = '+377';
            break;
          case 'Mongolia':
            code = '+976';
            break;
          case 'Montenegro':
            code = '+382';
            break;
          case 'Morocco':
            code = '+212';
            break;
          case 'Mozambique':
            code = '+258';
            break;
          case 'Myanmar (Burma)':
            code = '+95';
            break;
          case 'Namibia':
            code = '+264';
            break;
          case 'Nauru':
            code = '+674';
            break;
          case 'Nepal':
            code = '+977';
            break;
          case 'Netherlands':
            code = '+31';
            break;
          case 'New Zealand':
            code = '+64';
            break;
          case 'Nicaragua':
            code = '+505';
            break;
          case 'Niger':
            code = '+227';
            break;
          case 'Nigeria':
            code = '+234';
            break;
          case 'North Macedonia':
            code = '+389';
            break;
          case 'Norway':
            code = '+47';
            break;
          case 'Oman':
            code = '+968';
            break;
          case 'Pakistan':
            code = '+92';
            break;
          case 'Palau':
            code = '+680';
            break;
          case 'Palestine':
            code = '+970';
            break;
          case 'Panama':
            code = '+507';
            break;
          case 'Papua New Guinea':
            code = '+675';
            break;
          case 'Paraguay':
            code = '+595';
            break;
          case 'Peru':
            code = '+51';
            break;
          case 'Philippines':
            code = '+63';
            break;
          case 'Poland':
            code = '+48';
            break;
          case 'Portugal':
            code = '+351';
            break;
          case 'Qatar':
            code = '+974';
            break;
          case 'Romania':
            code = '+40';
            break;
          case 'Russia':
            code = '+7';
            break;
          case 'Rwanda':
            code = '+250';
            break;
          case 'Saint Kitts and Nevis':
            code = '+1 869';
            break;
          case 'Saint Lucia':
            code = '+1 758';
            break;
          case 'Saint Vincent and the Grenadines':
            code = '+1 784';
            break;
          case 'Samoa':
            code = '+685';
            break;
          case 'San Marino':
            code = '+378';
            break;
          case 'Sao Tome and Principe':
            code = '+239';
            break;
          case 'Saudi Arabia':
            code = '+966';
            break;
          case 'Senegal':
            code = '+221';
            break;
          case 'Serbia':
            code = '+381';
            break;
          case 'Seychelles':
            code = '+248';
            break;
            case 'Sierra Leone':
              code = '+232';
              break;
            case 'Singapore':
              code = '+65';
              break;
            case 'Slovakia':
              code = '+421';
              break;
            case 'Slovenia':
              code = '+386';
              break;
            case 'Solomon Islands':
              code = '+677';
              break;
            case 'Somalia':
              code = '+252';
              break;
            case 'South Africa':
              code = '+27';
              break;
            case 'Spain':
              code = '+34';
              break;
            case 'Sri Lanka':
              code = '+94';
              break;
            case 'Sudan':
              code = '+249';
              break;
            case 'Sudan':
              code = '+211';
              break;
            case 'Suriname':
              code = '+597';
              break;
            case 'Sweden':
              code = '+46';
              break;
            case 'Switzerland':
              code = '+41';
              break;
            case 'Syria':
              code = '+963';
              break;
            case 'Taiwan':
              code = '+886';
              break;
            case 'Tajikistan':
              code = '+992';
              break;
            case 'Tanzania':
              code = '+255';
              break;
            case 'Thailand':
              code = '+66';
              break;
            case 'Timor-Leste':
              code = '+670';
              break;
            case 'Togo':
              code = '+228';
              break;
            case 'Tonga':
              code = '+676';
              break;
            case 'Trinidad and Tobago':
              code = '+1 868';
              break;
            case 'Tunisia':
              code = '+216';
              break;
            case 'Turkey':
              code = '+90';
              break;
            case 'Turkmenistan':
              code = '+993';
              break;
            case 'Tuvalu':
              code = '+688';
              break;
            case 'Uganda':
              code = '+256';
              break;
            case 'Ukraine':
              code = '+380';
              break;
            case 'United Arab Emirates':
              code = '+971';
              break;
            case 'United Kingdom':
              code = '+44';
              break;
            case 'Uruguay':
              code = '+598';
              break;
            case 'Uzbekistan':
              code = '+998';
              break;
            case 'Vanuatu':
              code = '+678';
              break;
            case 'Vatican City':
              code = '+379';
              break;
            case 'Venezuela':
              code = '+58';
              break;
            case 'Vietnam':
              code = '+84';
              break;
            case 'Yemen':
              code = '+967';
              break;
            case 'Zambia':
              code = '+260';
              break;
            case 'Zimbabwe':
              code = '+263';
              break;
      default:
        code = '';
        break;
    }
    setGeneratedCode(code);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const newPhoneNumber = value.startsWith(generatedCode) ? value.substring(generatedCode.length) : value;
    setPhoneNumber(generatedCode + newPhoneNumber);
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_a6w89qh', 'template_r079207', form.current, 'ruNn-W1LNZy9t1sLM')
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          form.current.reset();
          setPhoneNumber('');
          setFormSubmitted(true); // Set formSubmitted to true after successful submission
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Failed to send email. Please try again.');
        }
      );
  };

  return (
    <div className='containerStyle' style={{ backgroundColor: '#F2F3F4' }}>
      <div style={{ backgroundImage: "url('contact us.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '60vh', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', color: 'white', fontSize: 'calc(8px + 2vmin)', marginRight: '60%', marginTop: '100px' }}>
          <h1>CONTACT US</h1>
          <div className="elementor-widget-container"> Get in touch with BitTwoByte </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gridTemplateColumns: '1fr 1fr', justifyContent: 'center', columnGap: '30px', marginTop: '30px' }}>
        <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d26622.09228275789!2d81.31924839679593!3d24.556398132705546!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3984596cfbde58ef%3A0x82d70476385dd06d!2sBitTwoByte%20Technology%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1712639908040!5m2!1sen!2sin"
            style={{ width: '97vw', height: "400px", border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div style={{ marginTop: '30px', padding: '0 10px', fontSize: 'calc(10px + 1vmin)', textAlign: 'center',backgroundColor:'#E5E7E9' ,width: '100%',}}>
        <h1>Drop Us A Note</h1>
     
        {formSubmitted ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Thank you for your submission!</h2>
            <p>We'll get back to you as soon as possible.</p>
          </div>
        ) : (
         
        <form ref={form} onSubmit={sendEmail} style={{ fontSize: 'calc(1vw + 2vmin)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', maxWidth: '600px', margin: 'auto', backgroundColor: 'white', padding: '20px' }}>

  <div style={{ width: '99%', marginBottom: '20px',marginRight:'17px'  }}>
    <textarea
      placeholder="Enter your full name"
      name="to_name"
      id="Fullname"
      required
      style={{
        width: '100%',
        height: '40px',
        padding: '10px',
        backgroundColor: '#F2F3F4',
        border: 'none',
        resize: 'none',
        fontSize: '16px',
        color: 'black',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    ></textarea>
  </div>

  <div style={{ width: '99%', marginBottom: '20px',marginRight:'17px'  }}>
    <textarea
      placeholder="Enter your email"
      name="email"
      id="email"
      required
      style={{
        width: '100%',
        height: '40px',
        padding: '10px',
        border: 'none',
        backgroundColor: '#F2F3F4',
        resize: 'none',
        fontSize: '16px',
        color: 'black',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    ></textarea>
  </div>

  <div style={{ width: '99%', marginBottom: '20px',marginRight:'17px'  }}>
    <textarea
      placeholder="Enter your number"
      name="to_name"
      id="Fullname"
      required
      value={phoneNumber} // Bind the value to the phoneNumber state variable
      onChange={handlePhoneNumberChange} // Update the phoneNumber state variable on change
      style={{
        width: '100%',
        height: '40px',
        padding: '10px',
        backgroundColor: '#F2F3F4',
        border: 'none',
        resize: 'none',
        fontSize: '16px',
        color: 'black',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    ></textarea>
  </div>

  <div style={{ width: '99%', marginBottom: '20px', marginRight:'17px' }}>
    <textarea
      placeholder="Company"
      name="email"
      id="email"
      required
      style={{
        width: '100%',
        height: '40px',
        padding: '10px',
        backgroundColor: '#F2F3F4',
        border: 'none',
        resize: 'none',
        fontSize: '16px',
        color: 'black',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    ></textarea>
  </div>

  <div style={{ width: '102%', marginBottom: '20px' }}>
    <select
      placeholder="Topic"
      name="Topic"
      id="Topic"
      required
      style={{
        width: '100%',
        height: '60px',
        padding: '10px',
        backgroundColor: '#F2F3F4',
        border: 'none',
        resize: 'none',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      <option value="" disabled selected>Select your Topic</option>
      <option value="SCM">SCM</option>
      <option value="Data Analytics">Data Analytics</option>
      <option value="Cloud">Cloud</option>
      <option value="Data Engineering">Data Engineering</option>
    </select>
  </div>

  <div style={{ width: '102%', marginBottom: '20px' }}>
    <select
      placeholder="Select your country"
      name="county"
      id="county"
      required
      style={{
        width: '100%',
        height: '60px',
        padding: '10px',
        resize: 'none',
        border: 'none',
        fontSize: '16px',
        backgroundColor: '#F2F3F4',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
      onChange={(e) => generateCode(e.target.value)} // Call generateCode function on change
      >

      <option value="" disabled selected>Select your country</option>
      <option value="USA"></option>
      <option value="USA">USA</option>
      <option value="Canada">Canada</option>
      <option value="UK">UK</option>
      <option value="Afghanistan">Afghanistan</option>
      <option value="Albania">lbania</option>
      <option value="Algeria">Algeria</option>
      <option value="Andorra">Andorra</option>
      <option value="Angola">Angola</option>
      <option value="Antigua and Barbuda">Antigua and Barbuda</option>
      <option value="Argentina">Argentina</option>
      <option value="Armenia">Armenia</option>
      <option value="Australia">Australia</option>
      <option value="Austria">Austria</option>
      <option value="Azerbaijan">Azerbaijan</option>
      <option value="Bahamas">Bahamas</option>
      <option value="Bahrain">Bahrain</option>
      <option value="Bangladesh">Bangladesh</option>
      <option value="Barbados">Barbados</option>
      <option value="Belarus">Belarus</option>
      <option value="Belgium">Belgium</option>
      <option value="Belize">Belize</option>
      <option value="Benin">Benin</option>
      <option value="Bhutan">Bhutan</option>
      <option value="Bolivia">Bolivia</option>
      <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
      <option value="Botswana">Botswana</option>
      <option value="Brazil">Brazil</option>
      <option value="Brunei">Brunei</option>
       <option value="Bulgaria">Bulgaria</option>
      <option value="Burkina Faso">Burkina Faso</option>
      <option value="Burundi">Burundi</option>
      <option value="Cabo Verde">Cabo Verde</option>
       <option value="Cambodia">Cambodia</option>
        <option value="Cameroon">Cameroon</option>
        <option value="Canada">Canada</option>
        <option value="Central African Republic">Central African Republic</option>
        <option value="Chad">Chad</option>
       <option value="Chile">Chile</option>
       <option value="China">China</option>
       <option value="Colombia">Colombia</option>
       <option value="Comoros">Comoros</option>
       <option value="Congo, Democratic Republic of the">Congo, Democratic Republic of the</option>
       <option value="Congo, Republic of the">Congo, Republic of the</option>
       <option value="Costa Rica">Costa Rica</option>
       <option value="Croatia">Croatia</option>
       <option value="Cuba">Cuba</option>
       <option value="Cyprus">Cyprus</option>
       <option value="Czech Republic">Czech Republic</option>
       <option value="Denmark">Denmark</option>
       <option value="Djibouti">Djibouti</option>
       <option value="Dominica">Dominica</option>
       <option value="Ecuador">Ecuador</option>
       <option value="Egypt">Egypt</option>
       <option value="El Salvador">El Salvador</option>
       <option value="Equatorial Guinea">Equatorial Guinea</option>
       <option value="Eritrea">Eritrea</option>
       <option value="Estonia">Estonia</option>
       <option value="Eswatini">Eswatini</option>
       <option value="Ethiopia">Ethiopia</option>
       <option value="Fiji">Fiji</option>
       <option value="Finland">Finland</option>
       <option value="France">France</option>
       <option value="Gabon">Gabon</option>
       <option value="Gambia">Gambia</option>
       <option value="Georgia">Georgia</option>
       <option value="Germany">Germany</option>
       <option value="Ghana">Ghana</option>
       <option value="Greece">Greece</option>
       <option value="Grenada">Grenada</option>
       <option value="Guatemala">Guatemala</option>
        <option value="Guinea">Guinea</option>
       <option value="Guinea-Bissau">Guinea-Bissau</option>
       <option value="Guyana">Guyana</option>
       <option value="Haiti">Haiti</option>
       <option value="Honduras">Honduras</option>
       <option value="Hungary">Hungary</option>
       <option value="Iceland">Iceland</option>
       <option value="India">India</option>
       <option value="Indonesia">Indonesia</option>
       <option value="Iran">Iran</option>
       <option value="Iraq">Iraq</option>
       <option value="Ireland">Ireland</option>
       <option value="Israel">Israel</option>
       <option value="Italy">Italy</option>
       <option value="Jamaica">Jamaica</option>
       <option value="Japan">Japan</option>
       <option value="Jordan">Jordan</option>
       <option value="Kazakhstan">Kazakhstan</option>
       <option value="Kenya">Kenya</option>
       <option value="Kiribati">Kiribati</option>
       <option value="Korea, North">Korea, North</option>
       <option value="Korea, South">Korea, South</option>
       <option value="Kosovo">Kosovo</option>
       <option value="Kuwait">Kuwait</option>
       <option value="Kyrgyzstan">Kyrgyzstan</option>
       <option value="Laos">Laos</option>
       <option value="Latvia">Latvia</option>
       <option value="Lebanon">Lebanon</option>
       <option value="Lesotho">Lesotho</option>
       <option value="Liberia">Liberia</option>
       <option value="Libya">Libya</option>
       <option value="Liechtenstein">Liechtenstein</option>
       <option value="Lithuania">Lithuania</option>
       <option value="Luxembourg">Luxembourg</option>
       <option value="Madagascar">Madagascar</option>
       <option value="Malawi">Malawi</option>
        <option value="Malaysia">Malaysia</option>
       <option value="Maldives">Maldives</option>
       <option value="Mali">Mali</option>
       <option value="Malta">Malta</option>
       <option value="Marshall Islands">Marshall Islands</option>
       <option value="Mauritania">Mauritania</option>
       <option value="Mauritius">Mauritius</option>
       <option value="Mexico">Mexico</option>
       <option value="Micronesia">Micronesia</option>
       <option value="Moldova">Moldova</option>
       <option value="Monaco">Monaco</option>
       <option value="Mongolia">Mongolia</option>
       <option value="Montenegro">Montenegro</option>
       <option value="Morocco">Morocco</option>
       <option value="Mozambique">Mozambique</option>
       <option value="Myanmar (Burma)">Myanmar (Burma)</option>
       <option value="Namibia">Namibia</option>
       <option value="Nauru">Nauru</option>
       <option value="Nepal">Nepal</option>
      <option value="Netherlands">Netherlands</option>
      <option value="New Zealand">New Zealand</option>
       <option value="Nicaragua">Nicaragua</option>
       <option value="Niger">Niger</option>
       <option value="Nigeria">Nigeria</option>
      <option value="North Macedonia (formerly Macedonia)">North Macedonia (formerly Macedonia)</option>
      <option value="Norway">Norway</option>
       <option value="Oman">Oman</option>
       <option value="Pakistan">Pakistan</option>
       <option value="Palau">Palau</option>
       <option value="Palestine">Palestine</option>
       <option value="Panama">Panama</option>
       <option value="Papua New Guinea">Papua New Guinea</option>
       <option value="Paraguay">Paraguay</option>
       <option value="Peru">Peru</option>
       <option value="Philippines">Philippines</option>
      <option value="Poland">Poland</option>
       <option value="Portugal">Portugal</option>
       <option value="Qatar">Qatar</option>
       <option value="Romania">Romania</option>
       <option value="Russia">Russia</option>
       <option value="Rwanda">Rwanda</option>
       <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
       <option value="Saint Lucia">Saint Lucia</option>
       <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
       <option value="Samoa">Samoa</option>
        <option value="San Marino">San Marino</option>
       <option value="Sao Tome and Principe">Sao Tome and Principe</option>
       <option value="Saudi Arabia">Saudi Arabia</option>
       <option value="Senegal">Senegal</option>
       <option value="Serbia">Serbia</option>
       <option value="Seychelles">Seychelles</option>
       <option value="Sierra Leone">vSierra Leone</option>
       <option value="Singapore">Singapore</option>
       <option value="Slovakia">Slovakia</option>
        <option value="Slovenia">Slovenia</option>
       <option value="Solomon Islands">Solomon Islands</option>
       <option value="Somalia">Somalia</option>
       <option value="South Africa">South Africa</option>
       <option value="South Sudan">South Sudan</option>
       <option value="Spain">Spain</option>
       <option value="Sri Lanka">Sri Lanka</option>
       <option value="Sudan">Sudan</option>
       <option value="Suriname">Suriname</option>
       <option value="Sweden">Sweden</option>
       <option value="Switzerland">Switzerland</option>
       <option value="Syria">Syria</option>
       <option value="Taiwan">Taiwan</option>
       <option value="Tajikistan">Tajikistan</option>
       <option value="Tanzania">Tanzania</option>
       <option value="Thailand">Thailand</option>
       <option value="Togo">Togo</option>
       <option value="Tonga">Tonga</option>
      <option value="Trinidad and Tobago">Trinidad and Tobago</option>
       <option value="Tunisia">Tunisia</option>
       <option value="Turkey">Turkey</option>
       <option value="Turkmenistan">Turkmenistan</option>
       <option value="Tuvalu">Tuvalu</option>
       <option value="Uganda">Uganda</option>
       <option value="Ukraine">Ukraine</option>
       <option value="United Arab Emirates">United Arab Emirates</option>
       <option value="United Kingdom">United Kingdom</option>
       <option value="United States of America">United States of America</option>
       <option value="Uruguay">Uruguay</option>
       <option value="Uzbekistan">Uzbekistan</option>
       <option value="Vanuatu">Vanuatu</option>
       <option value="Vatican City (Holy See)">Vatican City (Holy See)</option>
       <option value="Venezuela">Venezuela</option>
       <option value="Vietnam">Vietnam</option>
       <option value="Yemen">Yemen</option>
       <option value="Zambia">Zambia</option>
       <option value="Zimbabwe">Zimbabwe</option>      
       </select>
  </div>

  <div style={{ width: '100%', marginBottom: '20px',marginRight:'15px'  }}>
    <textarea
      placeholder="Tell us about your needs."
      name="message"
      id="message"
      required
      style={{
        width: '100%',
        height: '80px',
        padding: '10px',
        backgroundColor: '#F2F3F4',
        border: 'none',
        resize: 'none',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    ></textarea>
  </div>

  <div style={{ width: '20%', marginBottom: '30px' ,marginTop:'30px',textAlign: 'center', }}>
    <button
      style={{
        padding: '10px 50px',
        fontSize: '16px',
        backgroundColor: 'white',
        color: 'black',
        borderBlock: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        transitionDuration: '0.2s',
        fontWeight: 'bold'
      }}
      onMouseOver={(e) => { e.target.style.backgroundColor = '#27AE60'; }}
      onMouseOut={(e) => { e.target.style.backgroundColor = 'white'; }}
    >
      Submit
    </button>
  </div>
</form>

          
        )}
       
                        
                        
                             
              </div>
              </div>
              </div> 
             
                  
                );
              };
              
              export default Contact;
