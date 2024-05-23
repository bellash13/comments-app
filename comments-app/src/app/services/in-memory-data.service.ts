import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Comment } from 'src/app/models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const comments: Comment[] = [
      // Leapa comments
      { id: 1, comment: "Leapa has significantly improved our team's productivity with its intuitive interface and seamless integration with our existing tools.", topic: 'Leapa', author: 'John Doe', date: new Date() },
      { id: 2, comment: "I appreciate the customer support from Leapa. They are always responsive and helpful with any issues we face.", topic: 'Leapa', author: 'John Doe', date: new Date() },
      { id: 3, comment: "Leapa's project management features are top-notch. It has everything we need to keep our projects on track.", topic: 'Leapa', author: 'John Doe', date: new Date() },
      { id: 4, comment: "The recent updates to Leapa have made it even more user-friendly. Great job by the development team!", topic: 'Leapa', author: 'John Doe', date: new Date() },
      { id: 5, comment: "I highly recommend Leapa to any organization looking to streamline their workflow.", topic: 'Leapa', author: 'John Doe', date: new Date() },
      { id: 6, comment: "The analytics provided by Leapa give us valuable insights into our project progress and team performance.", topic: 'Leapa', author: 'Jane Smith', date: new Date() },
      { id: 7, comment: "Leapa's collaboration tools make it easy for our team to stay connected, even when working remotely.", topic: 'Leapa', author: 'Jane Smith', date: new Date() },
      { id: 8, comment: "I love the customizable dashboards in Leapa. They allow us to focus on the most critical metrics.", topic: 'Leapa', author: 'Jane Smith', date: new Date() },
      { id: 9, comment: "Leapa has made our document management so much easier. No more lost files or version control issues.", topic: 'Leapa', author: 'Jane Smith', date: new Date() },
      { id: 10, comment: "The integration capabilities of Leapa with other software are impressive. It fits perfectly into our tech stack.", topic: 'Leapa', author: 'Jane Smith', date: new Date() },
      { id: 11, comment: "Leapa has been a game-changer for our organization. The efficiency gains are evident across all departments.", topic: 'Leapa', author: 'Bob Johnson', date: new Date() },
      { id: 12, comment: "The user training provided by Leapa was excellent. Our team was up and running in no time.", topic: 'Leapa', author: 'Bob Johnson', date: new Date() },
      { id: 13, comment: "I appreciate the regular updates and new features that Leapa releases. They keep improving the platform.", topic: 'Leapa', author: 'Bob Johnson', date: new Date() },
      { id: 14, comment: "Leapa's security features give us peace of mind that our data is safe and secure.", topic: 'Leapa', author: 'Bob Johnson', date: new Date() },
      { id: 15, comment: "The support team at Leapa is fantastic. They always go above and beyond to assist us.", topic: 'Leapa', author: 'Bob Johnson', date: new Date() },
      
      // Cybersource comments
      { id: 16, comment: "Cybersource's payment gateway is robust and reliable. We've had zero downtime since we started using it.", topic: 'Cybersource', author: 'John Doe', date: new Date() },
      { id: 17, comment: "The fraud management tools provided by Cybersource have significantly reduced our chargeback rate.", topic: 'Cybersource', author: 'John Doe', date: new Date() },
      { id: 18, comment: "I appreciate the comprehensive documentation and developer support available for Cybersource.", topic: 'Cybersource', author: 'John Doe', date: new Date() },
      { id: 19, comment: "Integrating Cybersource with our e-commerce platform was straightforward and hassle-free.", topic: 'Cybersource', author: 'John Doe', date: new Date() },
      { id: 20, comment: "Cybersource's global reach allows us to accept payments from customers all over the world.", topic: 'Cybersource', author: 'John Doe', date: new Date() },
      { id: 21, comment: "Cybersource's tokenization service has enhanced our payment security, giving our customers peace of mind.", topic: 'Cybersource', author: 'Jane Smith', date: new Date() },
      { id: 22, comment: "The reporting and analytics tools in Cybersource help us make informed decisions about our business.", topic: 'Cybersource', author: 'Jane Smith', date: new Date() },
      { id: 23, comment: "Cybersource's support team is always ready to help with any technical issues we encounter.", topic: 'Cybersource', author: 'Jane Smith', date: new Date() },
      { id: 24, comment: "We appreciate the seamless integration of Cybersource with our existing payment infrastructure.", topic: 'Cybersource', author: 'Jane Smith', date: new Date() },
      { id: 25, comment: "The scalability of Cybersource makes it easy for us to grow our business without worrying about payment processing.", topic: 'Cybersource', author: 'Jane Smith', date: new Date() },
      { id: 26, comment: "The fraud detection algorithms in Cybersource are top-notch. They have prevented numerous fraudulent transactions.", topic: 'Cybersource', author: 'Bob Johnson', date: new Date() },
      { id: 27, comment: "I love how Cybersource handles international transactions with ease, including currency conversion.", topic: 'Cybersource', author: 'Bob Johnson', date: new Date() },
      { id: 28, comment: "Cybersource's API is well-documented and easy to use, making integration a breeze.", topic: 'Cybersource', author: 'Bob Johnson', date: new Date() },
      { id: 29, comment: "The customer service from Cybersource is excellent. They always resolve our issues quickly.", topic: 'Cybersource', author: 'Bob Johnson', date: new Date() },
      { id: 30, comment: "Cybersource's recurring billing features have streamlined our subscription management process.", topic: 'Cybersource', author: 'Bob Johnson', date: new Date() },

      // NexGo comments
      { id: 31, comment: "NexGo's mobile payment solutions have been a great addition to our business operations.", topic: 'NexGo', author: 'John Doe', date: new Date() },
      { id: 32, comment: "The user interface of NexGo terminals is intuitive and easy to navigate for our staff.", topic: 'NexGo', author: 'John Doe', date: new Date() },
      { id: 33, comment: "I appreciate the robust security features in NexGo's payment processing systems.", topic: 'NexGo', author: 'John Doe', date: new Date() },
      { id: 34, comment: "NexGo's customer service is responsive and knowledgeable about their products.", topic: 'NexGo', author: 'John Doe', date: new Date() },
      { id: 35, comment: "The integration of NexGo with our POS system was smooth and seamless.", topic: 'NexGo', author: 'John Doe', date: new Date() },
      { id: 36, comment: "NexGo's portable payment terminals are perfect for our on-the-go sales team.", topic: 'NexGo', author: 'Jane Smith', date: new Date() },
      { id: 37, comment: "The battery life on NexGo devices is impressive, lasting throughout our long working hours.", topic: 'NexGo', author: 'Jane Smith', date: new Date() },
      { id: 38, comment: "We have experienced no downtime with NexGo, ensuring uninterrupted payment processing.", topic: 'NexGo', author: 'Jane Smith', date: new Date() },
      { id: 39, comment: "NexGo's transaction speed is fast, improving our customer checkout experience.", topic: 'NexGo', author: 'Jane Smith', date: new Date() },
      { id: 40, comment: "The detailed transaction reports from NexGo help us keep track of our sales efficiently.", topic: 'NexGo', author: 'Jane Smith', date: new Date() },
      { id: 41, comment: "NexGo's devices are durable and reliable, even in high-traffic environments.", topic: 'NexGo', author: 'Bob Johnson', date: new Date() },
      { id: 42, comment: "The contactless payment feature on NexGo terminals has been a hit with our customers.", topic: 'NexGo', author: 'Bob Johnson', date: new Date() },
      { id: 43, comment: "Setting up NexGo devices was straightforward, with excellent support from their team.", topic: 'NexGo', author: 'Bob Johnson', date: new Date() },
      { id: 44, comment: "We value the flexibility NexGo offers with various payment options for our customers.", topic: 'NexGo', author: 'Bob Johnson', date: new Date() },
      { id: 45, comment: "NexGo's integration with our accounting software saves us a lot of time on bookkeeping.", topic: 'NexGo', author: 'Bob Johnson', date: new Date() },

      // Bancobu comments
      { id: 46, comment: "Bancobu offers excellent banking services with competitive interest rates.", topic: 'Bancobu', author: 'John Doe', date: new Date() },
      { id: 47, comment: "The customer service at Bancobu is friendly and helpful with all our banking needs.", topic: 'Bancobu', author: 'John Doe', date: new Date() },
      { id: 48, comment: "Bancobu's mobile banking app is user-friendly and packed with useful features.", topic: 'Bancobu', author: 'John Doe', date: new Date() },
      { id: 49, comment: "I appreciate the transparency and security measures Bancobu has in place for online transactions.", topic: 'Bancobu', author: 'John Doe', date: new Date() },
      { id: 50, comment: "Opening an account with Bancobu was quick and easy, thanks to their efficient processes.", topic: 'Bancobu', author: 'John Doe', date: new Date() },
      { id: 51, comment: "Bancobu's loan services have favorable terms and helped us finance our new home.", topic: 'Bancobu', author: 'Jane Smith', date: new Date() },
      { id: 52, comment: "The investment advice provided by Bancobu has been invaluable for our financial planning.", topic: 'Bancobu', author: 'Jane Smith', date: new Date() },
      { id: 53, comment: "Bancobu's ATM network is extensive, making it convenient to access our funds anywhere.", topic: 'Bancobu', author: 'Jane Smith', date: new Date() },
      { id: 54, comment: "The online banking experience with Bancobu is seamless and secure.", topic: 'Bancobu', author: 'Jane Smith', date: new Date() },
      { id: 55, comment: "I appreciate the personalized banking services that Bancobu offers to its customers.", topic: 'Bancobu', author: 'Jane Smith', date: new Date() },
      { id: 56, comment: "Bancobu's credit card offers have great rewards and benefits.", topic: 'Bancobu', author: 'Bob Johnson', date: new Date() },
      { id: 57, comment: "I trust Bancobu with my savings due to their robust security and excellent interest rates.", topic: 'Bancobu', author: 'Bob Johnson', date: new Date() },
      { id: 58, comment: "The staff at Bancobu are always willing to go the extra mile to assist with any issues.", topic: 'Bancobu', author: 'Bob Johnson', date: new Date() },
      { id: 59, comment: "Bancobu's foreign exchange services are efficient and offer competitive rates.", topic: 'Bancobu', author: 'Bob Johnson', date: new Date() },
      { id: 60, comment: "Managing my finances with Bancobu's digital tools is convenient and straightforward.", topic: 'Bancobu', author: 'Bob Johnson', date: new Date() }
    ];
    return { comments };
  }
}
