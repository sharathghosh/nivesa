import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-inter">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About नiveśa</h1>
        
        <div className="mb-12 flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900 shadow-lg">
            <Image 
              src="https://media.licdn.com/dms/image/v2/D4E03AQGmlXz-2bS_Jw/profile-displayphoto-shrink_200_200/B4EZbDOJGnHkAY-/0/1747031986993?e=2147483647&v=beta&t=1Lf3ZYTFK15BvWWz4nG2Yoj1DxusGMz6y5JSdTMqODU" 
              alt="Sharath Ghosh" 
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">Sharath Ghosh</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Founder & Analytics Leader</p>
            <p className="text-gray-700 dark:text-gray-300">
              Accomplished analytics leader with over 14 years of experience in building data science solutions and providing investment insights. Based in Basel, Switzerland.
            </p>
          </div>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Welcome to नiveśa (Niveśa), your trusted companion in the world of personal finance and investments. Our name, derived from the Sanskrit word for "investment," reflects our dedication to providing expert financial guidance rooted in understanding the unique needs of Indian and NRI investors.
          </p>
          
          <h2>Our Mission</h2>
          <p>
            At नiveśa, we believe that financial literacy is the cornerstone of financial freedom. Our mission is to demystify the complex world of investments and personal finance for Indians and Non-Resident Indians (NRIs) across the globe. We strive to provide clear, actionable, and well-researched advice that helps our readers make informed financial decisions.
          </p>
          
          <h2>What We Cover</h2>
          <p>
            Our content spans four core areas that form the foundation of personal finance for Indians worldwide:
          </p>
          
          <h3>Investments</h3>
          <p>
            We provide in-depth analysis of different fund categories, performance reviews, portfolio strategies, and fund manager insights to help you build and maintain a strong investment portfolio.
          </p>
          
          <h3>Reward Programs</h3>
          <p>
            Our credit card coverage includes comprehensive reviews, reward program analyses, spending optimization strategies, and guides to maximize benefits while avoiding common pitfalls.
          </p>
          
          <h3>Reward Programs</h3>
          <p>
            We help you navigate the complex world of airline miles, hotel points, and other reward programs to ensure you get maximum value from your travel and spending.
          </p>
          
          <h3>NRI Corner</h3>
          <p>
            Specifically tailored for Non-Resident Indians, this section covers investment opportunities in India, tax implications, repatriation rules, and strategies for managing finances across borders.
          </p>
          
          <h2>Our Founder</h2>
          <p>
            Sharath Ghosh is the founder and driving force behind नiveśa. With a background in analytics and data science at global companies like Abbott, IBM, and Hewlett-Packard, Sharath brings a unique analytical perspective to personal finance and investments.
          </p>
          
          <h3>Professional Background</h3>
          <p>
            Sharath has over 14 years of experience in data analytics leadership roles across multiple industries. His career includes:
          </p>
          
          <ul>
            <li>Analytics Leader at Abbott, developing data-driven insights for strategic decision-making</li>
            <li>Previous roles at IBM and Hewlett-Packard, where he received multiple awards for excellence</li>
            <li>A strong educational foundation from the Massachusetts Institute of Technology (MIT)</li>
            <li>Expertise in translating complex financial concepts into actionable investment strategies</li>
          </ul>
          
          <h3>Volunteer Work</h3>
          <p>
            Beyond his professional career, Sharath is passionate about financial education and microfinance:
          </p>
          
          <ul>
            <li>Organizer of analytics meetups and workshops since 2015, building a community of over 2,100 analytics professionals</li>
            <li>Active supporter of Kiva.org since 2014, providing microloans to small businesses in developing economies around the world</li>
          </ul>
          
          <h3>Languages</h3>
          <p>
            Sharath is fluent in English, Hindi, and Bengali, allowing him to connect with a diverse audience of investors from India and abroad.
          </p>
          
          <h2>Our Team</h2>
          <p>
            Beyond our founder, नiveśa is supported by a network of experienced financial analysts, certified financial planners, and industry professionals who bring decades of combined experience in various aspects of personal finance and investment management. Our contributors have worked with leading financial institutions, asset management companies, and financial media outlets.
          </p>
          
          <h2>Our Approach</h2>
          <p>
            Our content is guided by these core principles:
          </p>
          
          <ul>
            <li><strong>Accuracy:</strong> We prioritize factual accuracy and rely on verified data and research in all our articles.</li>
            <li><strong>Independence:</strong> Our recommendations are unbiased and free from external influence. When we feature products or services, we clearly disclose any potential conflicts of interest.</li>
            <li><strong>Accessibility:</strong> We break down complex financial concepts into accessible, easy-to-understand language without oversimplifying the important details.</li>
            <li><strong>Relevance:</strong> We focus on information that is directly applicable to the Indian and NRI context, considering unique regulatory environments, tax implications, and cultural factors.</li>
            <li><strong>Timeliness:</strong> We keep our content updated to reflect the latest market conditions, regulatory changes, and financial products.</li>
          </ul>
          
          <h2>Disclaimer</h2>
          <p>
            While we strive to provide accurate and up-to-date information, the content on नiveśa should not be considered as financial advice. Investment decisions should be made after considering your specific financial situation, goals, and risk tolerance, ideally in consultation with a qualified financial advisor. Past performance is not indicative of future results, and all investments carry risk.
          </p>
          
          <h2>Investment Philosophy</h2>
          <p>
            At नiveśa, our investment philosophy is built on data-driven decision making, quantitative analysis, and a deep understanding of the unique financial landscape for Indian and NRI investors. We believe that:
          </p>
          
          <ul>
            <li><strong>Research-Based Investing:</strong> Every investment recommendation is backed by thorough research and analysis, not market emotions or trends</li>
            <li><strong>Long-Term Focus:</strong> Building wealth is a marathon, not a sprint—we focus on sustainable strategies that compound over time</li>
            <li><strong>Global Perspective:</strong> Understanding both domestic and international markets is crucial for optimal portfolio construction, especially for NRIs</li>
            <li><strong>Risk Management:</strong> Proper risk assessment and portfolio diversification are fundamental to protecting and growing wealth</li>
            <li><strong>Financial Education:</strong> Empowering investors with knowledge is just as important as specific investment recommendations</li>
          </ul>

          <h2>Awards & Recognition</h2>
          <p>
            Sharath's work has been recognized through numerous professional accolades, including multiple awards for excellence at IBM and Hewlett-Packard. His analytical approach to finance and investments has earned him recognition in both the technology and financial sectors.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 my-8">
            <h3 className="text-xl font-semibold mb-2">Professional Achievements</h3>
            <ul className="list-none space-y-2 pl-0">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Manager&apos;s Choice Award (IBM, 2016)</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Trainer Award (Hewlett-Packard, 2015)</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Multiple Superstar Awards (Hewlett-Packard, 2013-2014)</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Organized analytics workshops for a community of 2,100+ professionals</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Active microfinance contributor through Kiva.org since 2014</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 my-8 border-l-4 border-blue-500">
            <blockquote className="italic text-gray-700 dark:text-gray-300">
              "              &quot;Sharath comes with great analytical and problem solving skill. During his short tenure at Indus Net Technologies, he left a lasting impression. I will not hesitate to make him part of my team, if situation arise. My best wishes to Sharath for his career.&quot;"
            </blockquote>
            <div className="mt-4 font-medium">— Abhishek Rungta</div>
          </div>
          
          <h2>Connect With Us</h2>
          <p>
            We value your feedback and suggestions. If you have questions, comments, or topic suggestions, please reach out to us at <a href="mailto:contact@nivesa.in" className="text-blue-700 dark:text-blue-400">contact@nivesa.in</a>.
          </p>
          
          <div className="flex gap-4 my-6">
            <a href="https://www.linkedin.com/in/ghoshsharath/" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
              Connect on LinkedIn
            </a>
            <a href="http://www.meetup.com/Bangalore-Analytics-Aspirants/" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.24 8.154c-.123-.304-.2-.644-.2-1.005 0-1.548 1.253-2.8 2.8-2.8.195 0 .384.02.568.057l1.593-2.76-.035-.02A9.954 9.954 0 0 0 12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-1.568-.3-3.066-.845-4.435L19.24 8.154z"/>
                <path d="M19.24 8.154c-.504.081-.738.308-.938.6-.306.096-.607.204-.9.328-.89.38-1.52 1.136-1.707 2.076-.144.724.195 1.356.7 1.824.91.837 2.412.987 2.918 2.02.248.504.196 1.1-.022 1.597-.274.625-.773 1.092-1.347 1.4-.38.204-.805.308-1.235.308-.418 0-.834-.097-1.205-.29a2.62 2.62 0 0 1-1.226-1.294c-.388-.896-.196-1.92.49-2.572.53-.508.805-1.2.756-1.928-.048-.712-.42-1.358-1.004-1.747-.786-.526-1.736-.662-2.643-.432-.906.23-1.712.785-2.21 1.52-.66.98-.838 2.29-.286 3.323.783 1.465 2.486 1.945 4.008 2.12.4.046.798.14 1.144.362.345.22.582.56.65.96.068.397-.03.825-.314 1.16-.34.406-.9.635-1.45.635-.55 0-1.11-.23-1.452-.634-.297-.352-.395-.812-.31-1.242.05-.254.15-.493.287-.708.11-.173.155-.253.168-.38.035-.31-.125-.584-.4-.672-.276-.09-.58.055-.715.34a3.153 3.153 0 0 0-.4 1.44c-.018.654.192 1.28.595 1.77.8.972 2.19 1.476 3.512 1.257 1.26-.21 2.287-1.174 2.598-2.432.168-.68.09-1.386-.22-2.012-.308-.626-.82-1.14-1.46-1.476-.497-.262-1.05-.407-1.605-.488-1.774-.257-3.13-.773-2.627-2.725.047-.18.107-.353.18-.52.33-.073.068-.143.107-.21.185.122.384.23.598.315.598.24 1.28.204 1.894.066.643-.144 1.246-.418 1.778-.8.532-.38.99-.864 1.328-1.43.338-.566.556-1.225.627-1.906.063-.608-.03-1.225-.254-1.784-.432-1.086-1.29-1.962-2.38-2.358-.627-.228-1.296-.286-1.96-.167-.66.12-1.28.41-1.77.854-.247.22-.454.464-.62.73-.167.265-.293.55-.388.85a3.52 3.52 0 0 0-.183 1.122c0 .054.003.107.006.16-.004.054-.005.107-.005.16 0 .373.036.73.107 1.07.097.475.27.916.508 1.31.064.106.132.208.205.305a4.12 4.12 0 0 1-.118-.036 5.257 5.257 0 0 0-1.033-.175c-.088-.67.012-.19.01-.284a5.494 5.494 0 0 0-.114-1.12 5.627 5.627 0 0 0-.687-1.734 5.564 5.564 0 0 0-1.193-1.308 5.542 5.542 0 0 0-1.584-.865 5.61 5.61 0 0 0-3.253-.107 5.61 5.61 0 0 0-1.73.738 5.564 5.564 0 0 0-1.326 1.174 5.536 5.536 0 0 0-.877 1.574c-.089.24-.158.49-.216.742-.057.254-.096.51-.115.77-.4.525.052 1.067.266 1.543.214.477.546.89.96 1.17.413.282.91.428 1.4.404.493-.023.96-.212 1.345-.504.385-.293.668-.703.784-1.17a2.234 2.234 0 0 0-.1-1.3c-.2-.477-.593-.858-1.076-.983-.484-.127-.98.03-1.3.39-.318.36-.42.896-.227 1.368.122.3.338.542.605.702a1.23 1.23 0 0 1-.544-.236 1.228 1.228 0 0 1-.367-.48c-.082-.195-.094-.42-.036-.632.058-.213.197-.4.39-.514.385-.228.883-.202 1.245.063.363.265.572.713.55 1.17a1.932 1.932 0 0 1-.682 1.377c-.403.324-.954.452-1.5.33-.545-.122-1.038-.496-1.318-1.014-.28-.518-.313-1.156-.09-1.708.223-.551.693-.988 1.292-1.182.6-.193 1.275-.1 1.812.253.537.354.897.947.964 1.617.068.67-.14 1.35-.56 1.845-.42.496-1.063.8-1.74.815-.675.016-1.33-.258-1.772-.74a2.471 2.471 0 0 1-.668-1.7c-.014-.655.206-1.304.614-1.806a2.63 2.63 0 0 1 1.65-.86c.666-.1 1.35.05 1.892.416.542.366.93.934 1.077 1.6.074.334.09.682.047 1.027-.044.344-.136.683-.28 1.002a3.5 3.5 0 0 1-.513.843c-.21.262-.468.49-.763.666a3.01 3.01 0 0 1-1 .35 2.99 2.99 0 0 1-1.07.01c-.347-.066-.67-.203-.947-.4a1.994 1.994 0 0 1-.647-.734 1.987 1.987 0 0 1-.223-.96c.005-.34.102-.665.267-.946l.02-.03z"/>
              </svg>
              Join Our Meetup Group
            </a>
          </div>
          
          <p>
            Thank you for trusting नiveśa as your financial guide. We're committed to helping you navigate your financial journey with confidence and clarity.
          </p>
        </div>
      </div>
    </div>
  );
}
