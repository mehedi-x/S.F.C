function showTutorials(type) {
  const tutorialList = document.getElementById('tutorial-list');
  tutorialList.innerHTML = ''; // Clear the list first

  if (type === 'free') {
    tutorialList.innerHTML = `
      <div class="tutorial">Free Tutorial 1</div>
      <div class="tutorial">Free Tutorial 2</div>
      <div class="tutorial">Free Tutorial 3</div>
    `;
  } else if (type === 'premium') {
    tutorialList.innerHTML = `
      <div class="tutorial">Premium Tutorial 1 (Paid)</div>
      <div class="tutorial">Premium Tutorial 2 (Paid)</div>
      <div class="tutorial">Premium Tutorial 3 (Paid)</div>
    `;
  }
}
