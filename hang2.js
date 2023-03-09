const wordE1=document.getElementById('word');
const wrongLettersE1= document.getElementById('wrong-letters');
const playAgainBtn=document.getElementById('Play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts=document.querySelectorAll(".figure-part");

const words=['application', 'programming', 'interface', 'wizard'];

let selectedword= words[Math.floor(Math.random()*words.length)];

const correctLetters=[];
const wrongLetters=[];

function displayword(){
    wordE1.innerHTML = `${selectedword.split('')
    .map(
        letter=>`
        <span class="letter">
        ${correctLetters.includes(letter)? letter : ''}
        </span>
        `
    )

.join('')}
`;

const innerword=wordE1.innerText.replace(/\n/g,'');
if(innerword===selectedword){
    finalMessage.innerText='MUBARAK HO TUM JEET GYA';
    popup.style.display='flex';
}

}

function updateWrongLetterE1(){
    wrongLettersE1.innerHTML=`
    ${wrongLetters.length>0 ? '<p>WRONG</p>' : ''}
    ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `;


  figureParts.forEach((part,index)=>{
   const error=wrongLetters.length;
      
   if(index<error){
    part.style.display='block';
   }
   else{
    part.style.display='none';
   }

 });

 if(wrongLetters.length===figureParts.length){
    finalMessage.innerText= 'unfortunately you lost';
    popup.style.display = 'flex';
 }

}

function shownotification(){
    notification.classList.add('show');

    setTimeout(()=>{
        notification.classList.remove('show');
    }, 2000);

}

window.addEventListener('keydown', e=>{
   if(e.keyCode>=65 && e.keyCode<=90){
    const letter = e.key;
     
    if(selectedword.includes(letter)){
        if(!correctLetters.includes(letter)){
            correctLetters.push(letter);

            displayword();
        }else{
            shownotification();
        }
    }else{
        if(!wrongLetters.includes(letter)){
            wrongLetters.push(letter);

            updateWrongLetterE1();
        }else{
            shownotification();
        }
    }

   }

});

playAgainBtn.addEventListener('click',()=>{
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedword=words[Math.floor(Math.random()*words.length)];
    displayword();
    updateWrongLetterE1();
    popup.style.display='none';
});

displayword();