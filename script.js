const video=document.querySelector('video');
const player = document.querySelector('.player');
const progress_range = document.querySelector('.progress-range');
const progress_bar= document.querySelector('.progress-bar');
const play_btn= document.getElementById('play-btn');
const volume_icon= document.getElementById('volume-icon');
const full_screen_icon= document.getElementById('full_screen_icon');
const volume_range= document.querySelector('.volume-range');
const volume_bar= document.querySelector('.volume-bar');
const current_time= document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const full_screen = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');
//volume controls 
let last_volume=1;

// playback speed
function change_speed() {
    //console.log(speed.value);
    video.playbackRate=speed.value;
}
//volume bar
function change_volume(e) {
    let volume = e.offsetX / volume_range.offsetWidth;
    console.log(volume);
    if (volume<0.1){
        volume=0;
    }
    if(volume>0.9){
        volume=1;
    }
    volume_bar.style.width=`${volume*100}%`;
    video.volume=volume;
    // change icon depending on volume
    volume_icon.className =''; 
    if (volume>0.7){
        volume_icon.classList.add('fas','fa-volume-up');
    }else if (volume<0.7 && volume>0){
        volume_icon.classList.add('fas','fa-volume-down');
    }else if (volume===0){
        volume_icon.classList.add('fas','fa-volume-off');
    }
    last_volume=volume;
}

// play & pause----
function show_play_icon() {
    play_btn.classList.replace('fa-pause','fa-play');
    play_btn.setAttribute('title','Play');
}
function toggle_play() {
    if (video.paused){
        video.play();
        play_btn.classList.replace('fa-play', 'fa-pause');
        play_btn.setAttribute('title', 'Pause');
    }else{
        video.pause();
        show_play_icon();
    }
}
// mute/Unmute

function toggleMute() {
    volume_icon.className='';
    if (video.volume){
        last_volume=video.volume;
        volume_icon.classList.add('fas', 'fa-volume-mute');
        volume_icon.setAttribute('title', 'Unmute');
        video.volume=0;
        volume_bar.style.width=0;
    }else{
        video.volume=last_volume;
        volume_icon.classList.add('fas', 'fa-volume-up');
        volume_icon.setAttribute('title', 'Mute');
        volume_bar.style.width=`${last_volume*100}%`;
    }
}

// on video ended , show play button icon
video.addEventListener('ended',show_play_icon);

// display time format
function display_time(time) {
    const min=Math.floor(time/60);
    let sec=Math.floor(time%60);
    sec = sec >9 ? sec:`0${sec}`;
    return `${min}:${sec}`;
}

// progressbar update with time
function update_progress() {
    //console.log(video.currentTime,"  ",video.duration," ",(video.currentTime/video.duration)," ",(video.currentTime/video.duration)*100,"%");
    progress_bar.style.width = `${(video.currentTime/video.duration)*100}%`;
    current_time.textContent = `${display_time(video.currentTime)} /`;
    duration.textContent = `${display_time(video.duration)} `;
}

//click to seek within the video

function set_progress(e) {
    const new_time=(e.offsetX / progress_range.offsetWidth);
    progress_bar.style.width = `${new_time*100}%`;
    video.currentTime = new_time * video.duration;
    //console.log(new_time);
}

let fullScreen=false;
// full screen
// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE/Edge */
      element.msRequestFullscreen();
    }
    full_screen_icon.classList.replace('fa-expand','fa-compress');
    full_screen_icon.setAttribute('title','Compress');
    video.classList.add('video-fullscreen');
  }
  
  /* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
    full_screen_icon.classList.replace('fa-compress','fa-expand');
    full_screen_icon.setAttribute('title','Full screen');
    video.classList.remove('video-fullscreen');
  }
function toggle_full_screen() {
    !fullScreen ? openFullscreen(player) : closeFullscreen();
    fullScreen=!fullScreen;
}
// event listners
play_btn.addEventListener('click',toggle_play);
video.addEventListener('click',toggle_play);
video.addEventListener('timeupdate',update_progress);
video.addEventListener('canplay',update_progress);
progress_range.addEventListener('click',set_progress);
volume_range.addEventListener('click',change_volume);
volume_icon.addEventListener('click',toggleMute);
speed.addEventListener('change',change_speed);
full_screen.addEventListener('click',toggle_full_screen);