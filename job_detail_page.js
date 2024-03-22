$(function () {
  const db = firebase.firestore();
  db.collection("jobPostings").doc('N4Yvrfc4dr8Bhtel2kym').get().then((doc) => {
    if (doc.exists) {
      // ドキュメントのデータをコンソールに表示
      const data = doc.data();
      const imageUrls = data.imageUrls1; // Assuming 'imageUrls' is the field containing the array of image URLs
      const slideContainer = document.querySelector('.slide-container');
      slideContainer.innerHTML = '';
      const firstImage = document.querySelector('section > .first_img');
      if (imageUrls.length > 0) {
        firstImage.src = imageUrls[0];
        firstImage.alt = "画像1"; // Set an appropriate alt text
      }
      imageUrls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = "画像"; // Set an appropriate alt text
    
        // Add an event listener to each img tag
        img.addEventListener('click', () => {
          // Update the src of the .first_img image to the src of the clicked image
          firstImage.src = img.src;
          firstImage.alt = img.alt; // Update alt text if necessary
        });
    
        slideContainer.appendChild(img);
      });
    } else {
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
});