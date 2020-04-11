const app = () => {
     const song = document.querySelector('.song');
     const play = document.querySelector('.play');
     const outline = document.querySelector('.moving-outline circle');
     const video = document.querySelector('.vid-container video');
     const mainBG = document.querySelector('.app')

     //Sounds
     const sounds = document.querySelectorAll('.sound-picker button');

     //Time Display
     const timeDisplay = document.querySelector('.time-display');
     const timeSelect = document.querySelectorAll('.time-select button');

     //Get the length of the outline of the circle
     const outlineLength = outline.getTotalLength();
     
     //Duration
     let fakeDuration = 600;

     mainBG.style.background = 'black';

     //Outline of the circle changing color
     outline.style.strokeDasharray = outlineLength;
     outline.style.strokeDashoffset = outlineLength;

     //Pick different sound
     sounds.forEach(sound => {
      sound.addEventListener('click', function(){
       mainBG.style.background = 'transparent';
       song.src = this.getAttribute('data-sound');
       video.src = this.getAttribute('data-video');
       checkPlaying(song);
      })
     })

     //Play Sound
     play.addEventListener('click', () => {
      mainBG.style.background = 'transparent';
      checkPlaying(song);
     })

     //Select sound (labeling each time button as an option, getting value for data-time in each that we set in the HTML)
     timeSelect.forEach(option => {
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:00`
      option.addEventListener('click', function() {
       fakeDuration = this.getAttribute('data-time')
       timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:00`
      })
     })

     //Create a function specific to stop and play the sounds
     const checkPlaying = song => {
      if (song.paused){
       song.play();
       video.play();
       play.src = './svg/pause.svg';
      } else {
       song.pause();
       video.pause();
       play.src = './svg/play.svg'
      }
     }

     //Change the timer text
     song.ontimeupdate = () => {
      let currentTime = song.currentTime;
      // Checks elapsed time of the song by comparing how long the song has played minused from the fakeDuration variable we set above
      let elapsed = fakeDuration - currentTime
      //Will have text behave like time rather than just normal numbers
      let seconds = Math.floor(elapsed % 60);
      let minutes = Math.floor(elapsed / 60);

      //Animate the circle
      let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
      outline.style.strokeDashoffset = progress;
      //Animate text
      timeDisplay.textContent = `${minutes}: ${seconds}`

      if(currentTime >= fakeDuration){
       song.pause();
       song.currentTime = 0;
       play.src = './svg/play.svg'
       video.pause();
      }
     }
 }

app();
 