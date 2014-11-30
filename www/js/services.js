angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Albums', function() {


  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var albums = [  
   {  
      "id":"0",
      "name":"Singham returns",
      "img":"http://1.bp.blogspot.com/-SrVB3jbL0r8/U7mZX1zx6qI/AAAAAAAABfg/pDNunz9_PeU/s200-c/Br4VxBICAAA9uFv.jpg",
      "release":"Aug 15 2014",
      "feedback":"SuperHit",
      "songs":[  
         {  
            "id":"1",
            "title":"Aata Majhi Satakli",
            "singer":"Yo Yo Honey Singh",
            "utube":""
         },
         {  
            "id":"2",
            "title":"Kuch Toh Hua Hai",
            "singer":"Ankit Tiwari, Tulsi Kumar ",
            "utube":""
         },
         {  
            "id":"3",
            "title":"Singham Returns Theme",
            "singer":"Meet Bros Anjjan",
            "utube":""
         },
         {  
            "id":"4",
            "title":"Sun Le Zara",
            "singer":"Arijit Singh",
            "utube":""
         }
      ]
   },
   {  
      "id":"1",
      "name":"Kick",
      "img":"http://2.bp.blogspot.com/-YtXr93wTsxQ/U51y8znpsjI/AAAAAAAABaY/TYYPLK_pfVg/s1600/BqKbGVYCMAAgeJc.jpg",
      "release":"25 July 2014",
      "feedback":"Blockbuster",
      "songs":[  
         {  
            "id":"0",
            "title":"Jumme Ki Raat",
            "singer":"Mika Singh",
            "utube":""
         },
         {  
            "id":"1",
            "title":"Hangover",
            "singer":"Salman Khan",
            "utube":""
         },
         {  
            "id":"2",
            "title":"Tu Hi Tu",
            "singer":"Salman Khan",
            "utube":""
         },
         {  
            "id":"3",
            "title":"Yaar Na Mile / DEVIL",
            "singer":"Honey Singh",
            "utube":""
         },
         {  
            "id":"4",
            "title":"Hai Yehi Zindagi ",
            "singer":"Salman Khan",
            "utube":""
         }
      ]
   },
   {  
      "id":"2",
      "name":"Hate Story 2",
      "img":"http://1.bp.blogspot.com/-nNqrK-GqwFk/U5HLNPMgssI/AAAAAAAABXU/9XgBuiMvKf0/s300/Hate_Story.jpg",
      "release":"18 July 2014",
      "feedback":"Hit",
      "songs":[  
         {  
            "id":"0",
            "title":"Aaj Phir Tum Pe",
            "singer":"Arijit Singh",
            "utube":""
         },
         {  
            "id":"1",
            "title":"Kabhi Aayine Pe ",
            "singer":"Rash Khan",
            "utube":""
         },
         {  
            "id":"2",
            "title":"Pink Lips",
            "singer":"Meet Bros",
            "utube":""
         },
         {  
            "id":"3",
            "title":"Hai Dil Ye Mera",
            "singer":"Arijit Singh",
            "utube":""
         }
      ]
   },
   {  
      "id":"3",
      "name":"Holiday(Akshay) ",
      "img":"http://1.bp.blogspot.com/-C-U1V2CFgwI/UxLQv9bwJwI/AAAAAAAAA_s/kDFjds4j_VM/s1600/Bhp1HN9CcAEjmH3.jpg",
      "release":"6 June 2014",
      "feedback":"Hit",
      "songs":[  
         {  
            "id":"0",
            "title":"Tu Hi Toh Hai",
            "singer":"Benny Dayal",
            "utube":""
         },
         {  
            "id":"1",
            "title":"Shaayraana ",
            "singer":"Arijit Singh",
            "utube":""
         },
         {  
            "id":"2",
            "title":"Blame The Night",
            "singer":"Arijit Singh",
            "utube":""
         },
         {  
            "id":"3",
            "title":"Naina Ashq Na Ho",
            "singer":"Arijit Singh",
            "utube":""
         },
         {  
            "id":"4",
            "title":"Palang Tod",
            "singer":"Mika Singh",
            "utube":""
         }
      ]
   },
   {  
      "id":"4",
      "name":"Heropanti",
      "img":"http://upload.wikimedia.org/wikipedia/en/thumb/0/0d/Heropanti_Poster.jpg/220px-Heropanti_Poster.jpg",
      "release":"23 May 2014",
      "feedback":"Hit",
      "songs":[  
         {  
            "id":"0",
            "title":"Whistle Baja",
            "singer":"Nindy Kaur",
            "utube":""
         },
         {  
            "id":"1",
            "title":"Rabba",
            "singer":"Mohit Chauhan",
            "utube":""
         },
         {  
            "id":"3",
            "title":"Raat Bhar",
            "singer":"Arijit Singh",
            "utube":""
         },
         {  
            "id":"4",
            "title":"Tabah",
            "singer":"Mohit Chauhan",
            "utube":""
         },
         {  
            "id":"5",
            "title":"The Pappi Song",
            "singer":"Manj, Raftaar",
            "utube":""
         },
         {  
            "id":"6",
            "title":"Tere Binaa",
            "singer":"Mustafa Zahid",
            "utube":""
         }
      ]
   },
   {  
      "id":"5",
      "name":"2 States",
      "img":"http://4.bp.blogspot.com/-BHzQfRWMomY/U09yEDkWMvI/AAAAAAAABHM/CdwFqJT9sxA/s1600/Two_States_opt.jpg",
      "release":"18 April 2014",
      "feedback":"Super Hit",
      "songs":[  
         {  
            "id":"0",
            "title":"OFFO",
            "singer":"Aditi Singh Sharma",
            "utube":""
         },
         {  
            "id":"1",
            "title":"Locha E Ulfat",
            "singer":"Benny Dayal",
            "utube":""
         },
         {  
            "id":"2",
            "title":"Mast Magan",
            "singer":"Arijit Singh & Chinmayi Sripada",
            "utube":""
         },
         {  
            "id":"3",
            "title":"Iski Uski",
            "singer":"Shahid Mallya",
            "utube":""
         },
         {  
            "id":"4",
            "title":"Chandaniya",
            "singer":"K. Mohan & Yashita Sharma",
            "utube":""
         },
         {  
            "id":"5",
            "title":"Hulla Re",
            "singer":"Siddharth Mahadevan",
            "utube":""
         }
      ]
   },
   {  
      "id":"6",
      "name":"Bhootnath Returns",
      "img":"http://1.bp.blogspot.com/-lM-Ffyc2HEs/Uw2EKBiBYJI/AAAAAAAAA-g/XQPC6Mk2Vsc/s1600/BhV0kESIQAA6_Cy.jpg",
      "release":"Apr 11 2014",
      "feedback":"Flop",
      "songs":[  
         {  
            "id":"0",
            "title":"Party To Banti Hai",
            "singer":"Mika Singh",
            "utube":""
         },
         {  
            "id":"1",
            "title":"Har Har Gange",
            "singer":"Aman Trikha",
            "utube":""
         },
         {  
            "id":"2",
            "title":"Party With Bhootnath",
            "singer":"Yo Yo Honey Singh",
            "utube":""
         },
         {  
            "id":"3",
            "title":"Sahib Nazar Rakhna",
            "singer":"Rituraj",
            "utube":""
         },
         {  
            "id":"4",
            "title":"Dharavi Rap",
            "singer":"Parth Bhalerao, Anish",
            "utube":""
         }
      ]
   },
   {  
      "id":"7",
      "name":"Main Tera Hero",
      "img":"http://www.media.glamsham.com/download/poster/images/main-tera-hero/03-main-tera-hero.jpg",
      "release":"Mar 28 2014",
      "feedback":"Flop",
      "songs":[  
         {  
            "id":"0",
            "title":"Besharmi Ki Height",
            "singer":"Benny Dayal",
            "utube":""
         },
         {  
            "id":"1",
            "title":"Tera Hero idhar Hai",
            "singer":"Arijit Singh",
            "utube":""
         },
         {  
            "id":"2",
            "title":"Shanivaar Raati",
            "singer":"Arijit Singh",
            "utube":""
         },
         {  
            "id":"3",
            "title":"Galat Baat Hai",
            "singer":"Neeti Mohan, Javed Ali",
            "utube":""
         },
         {  
            "id":"4",
            "title":"Besharmi Ki Height ",
            "singer":"DJ Notorious",
            "utube":""
         },
         {  
            "id":"1",
            "title":"Shanivaar Raati (Remix)",
            "singer":"DJ Notorious",
            "utube":""
         }
      ]
   },
   {  
      "id":"8",
      "name":"Queen",
      "img":"http://upload.wikimedia.org/wikipedia/en/thumb/4/45/QueenMoviePoster7thMarch.jpg/220px-QueenMoviePoster7thMarch.jpg",
      "release":"7 Mar 2014",
      "feedback":"Super Hit",
      "songs":[  
         {  
            "id":"0",
            "title":"Taake Jhanke ",
            "singer":"Arijit Singh",
            "utube":""
         },
         {  
            "id":"1",
            "title":"Badra Bahaar ",
            "singer":"Amit Trivedi",
            "utube":""
         },
         {  
            "id":"2",
            "title":"Harjaiyaan ",
            "singer":"Nandini Srikar",
            "utube":""
         },
         {  
            "id":"3",
            "title":"Ranjha ",
            "singer":"Rupesh Kumar Ram",
            "utube":""
         },
         {  
            "id":"4",
            "title":"Kinare ",
            "singer":"Mohan Kanan",
            "utube":""
         }
      ]
   },
   {  
      "id":"9",
      "name":"3 idiots",
      "img":"http://pakbethak.com/wp-content/uploads/2014/08/3-Idiots.jpg",
      "release":"7 Mar 2007",
      "feedback":"Super Hit",
      "songs":[  
         {  
            "id":"0",
            "title":"Aal Izz Well",
            "singer":"Shantanu Moitra ",
            "utube":""
         },
         {  
            "id":"1",
            "title":"Behati Hawa Sa Tha Woh",
            "singer":"Shantanu Moitra ",
            "utube":""
         },
         {  
            "id":"2",
            "title":"Give Me Some Sunshine",
            "singer":"Shantanu Moitra ",
            "utube":""
         },
         {  
            "id":"3",
            "title":"Jaane Nahin Denge Tujhe",
            "singer":"Shantanu Moitra",
            "utube":""
         },
         {  
            "id":"4",
            "title":"Zoobi Doobi Zoobi Doobi",
            "singer":"Shantanu Moitra ",
            "utube":""
         }
      ]
   },
   {  
      "id":"10",
      "name":"Swades",
      "img":"http://upload.wikimedia.org/wikipedia/en/5/5f/Swades_movie_poster.png",
      "release":"10 Jan 2010",
      "feedback":"Super Hit",
      "songs":[  
         {  
            "id":"0",
            "title":"Aahista Aahista",
            "singer":"A. R. Rahman ",
            "utube":""
         },
         {  
            "id":"1",
            "title":"Dekho Na ",
            "singer":"A. R. Rahman",
            "utube":""
         },
         {  
            "id":"2",
            "title":"Pal Pal Hai Bhaari",
            "singer":" A. R. Rahman ",
            "utube":""
         },
         {  
            "id":"3",
            "title":"Saanwariya Saanwariya",
            "singer":"A. R. Rahman ",
            "utube":""
         },
         {  
            "id":"4",
            "title":"Yeh Jo Des Hai Tera- Patriotic Songs",
            "singer":"A. R. Rahman ",
            "utube":""
         },
         {  
            "id":"5",
            "title":"Yeh Tara Woh Tara",
            "singer":"A. R. Rahman ",
            "utube":""
         },
         {  
            "id":"6",
            "title":"Yun Hi Chala Chal",
            "singer":"A. R. Rahman ",
            "utube":""
         }
      ]
   }
];

  return {
    all: function() {
      return albums;
    },
    get: function(albumId) {
      // Simple index lookup
      return albums[albumId];
    }
  }
});
