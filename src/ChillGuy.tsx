// import React from 'react'
import { useState, useEffect } from 'react'

import chill_guy from './assets/chill-guy.png'
import snow_1 from './assets/snow_1.png'
import snow_2 from './assets/snow_2.png'
import snow_3 from './assets/snow_3.png'
import snow_4 from './assets/snow_4.png'
import clouds_1 from './assets/clouds_1.png'
import clouds_2 from './assets/clouds_2.png'
import clouds_3 from './assets/clouds_3.png' 
import clouds_4 from './assets/clouds_4.png'
import clouds_5 from './assets/clouds_5.png'
import rain_1 from './assets/rain_1.png'
import rain_2 from './assets/rain_2.png'
import rain_3 from './assets/rain_3.png'
import rain_4 from './assets/rain_4.png'
import thunderstorm_1 from './assets/thunderstorm_1.png'
import thunderstorm_2 from './assets/thunderstorm_2.png'
import sunny_1 from './assets/sunny_1.png'
import sunny_2 from './assets/sunny_2.png'
import sunny_3 from './assets/sunny_3.png'
import sunny_4 from './assets/sunny_4.png'
import sunny_5 from './assets/sunny_5.png'
import random_1 from './assets/random_1.png'
import random_2 from './assets/random_2.png'
import random_3 from './assets/random_3.png'
import random_4 from './assets/random_4.png'
import random_5 from './assets/random_5.png'

// const API_KEY = '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';
interface brainrotMap {
  [key: string] : {
    caption: string[];
    pic: string[];
  }
}

const brainrotMap: brainrotMap = {
  //snow
  "heavy snow" : {
    caption: [ "the snow ratio goes crazyyy. Usually wearing a jacket ain't tuff, but today you gotta.", "THIS is skibidi. 👅🚽", "what the sigma. Wear a jacket fam🤬.", "just put the fries in the bag. You gotta stay inside shawdy.⛓😈", "it looks like sniffing white powder.", "you GYATT to stay home, or else you'll be calling the snow mr alpha.🤷‍♀️", "THIS is the winter arc. DONT 🚫🚫🚫❌❌ UNDERASTIMATE😡😡 THE POWER OF THE ULTIMATE MEWING RIZZLER."],
    pic: [snow_1, snow_2]
  },

  "light snow" : {
    caption: ["the snow is edging you 🗿 🤫🧏‍♂️. Don't take it.", "you're about to get snowed on. It's a little ( ͠° ͟ʖ ͡°) sussy?", "winter be calling you sigma. It's hella cold bruh. UwU🥺👉👈", "I don't know nothing bout no ice, I'm just cold. You bouta be cold if you step outside. 😭😭", "the winter arc is beginning 🐺🖤⛓️💔. There will be light snow so don't lose any aura."],
    pic: [snow_4]
  },

  "moderate snow" : {
    caption: ["mid snow. (°□°) ☝️", "all I can say is 𝒈𝒐𝒐𝒅 𝒍𝒖𝒄𝒌 𝒃𝒂𝒃𝒆! It's cold as poop outside.", "the weather outside is frightful, but the fire inside it so delightful🌲🫦", "I don't know nothing bout no ice, I'm just cold. You're gonna be cold too🧑‍🎄", "it's looking like you're deep into the winter arc. Dress warm 🤑"],
    pic: [snow_3]
  },

  //clouds
  "few clouds" : {
    caption: ["it's beta behavior outsie ‧˚꒰🐾꒱༘⋆. There's a couple clouds but idk what else to tell you.", "the clouds ain't mewing. The sky ain't really clear 😩", "it's goofy ahh clouds today. They can't choose if they wanna be there or not."],
    pic: [clouds_4]
  },

  "overcast clouds" : {
    caption: [ "it'll feel like looking through a screen. It's like a little cloudy but not really.", "the clouds are hella indecisive with it's overcast, like lets just get chipotle💥."],
    pic: [clouds_3]
  },

  "scattered clouds" : {
    caption: ["clouds ain't mogging enough 😂⃤😅⃤ 🧸⃤", "the clouds can't decide if they wanna go BYE🤫BYE🧏 or not."],
    pic: [clouds_1, clouds_2]
  },

  "clear sky" : {
    caption: [ "today's a perfect day for you to touch grass🌿. I know it's been at least a year💀.", "the baddies are probably out with a clear sky 🔥🔥🔥🔥", "the sky's looksmaxing (☞ ͡° ͜ʖ ͡°)☞. It's very clear outside.", "the sky's nonchalant with the clearness today."],
    pic: [sunny_4, clouds_1]
  },

  "broken clouds" : { 
    caption: ["very omega behaviour, like why are the clouds broken?? 😔", "it's giving demure clouds. 🙄💅✨", "the clouds be broken like my heart, I know you broken too. 𓆩🥺🫶🏻💞𓆪 "],
    pic: [clouds_3]
  },

  //rain
  "light rain" : {
    caption: [ "don't get caught lacking, bring a rain jacket today. 🌧😪", "iT's STILL WaTeR 🥽🌧", "it's a lil sus outside 😳👉👈. The sky might or not be crying lolzzz."],
    pic: [rain_1, rain_2]
  },

  "moderate rain" : {
    caption: [ "the sky is in its prime and this ain't even final form. 💦🌧", "its a little scawwyyy outside. 🫷🥺🫸StAwP"],
    pic: [rain_4]
  },

  "heavy rain" : {
    caption: ["now THIS is skibidi. It's gonna rain A LOT.😈",  "ermm what the sigma 🤓☝️. Why is it raining so heavy today?", "you GYATT to stay home🍑😩", "ermm it's not optimal. Pretty heavy rain might impact your aura today."],
    pic: [rain_3, snow_4] 
  },

  "thunderstorm" : {
    caption: ["you GYATT to stay home🍑😩", "watch skibidi inside crodie, there's gonna be thunder.🙈🌩", "iit's a level 1000 GYATTTT STORM🍑⛈⛈", "you're cooked with the weather. Mann it's raining with thunder 😔", "𝐰𝐨𝐦𝐩 𝐰𝐨𝐦𝐩 🎀. You def ain't getting outside today. If you do, might wanna bring an umbrella."],
    pic: [thunderstorm_1, thunderstorm_2]
  },

  "sunny" : {
    caption: ["you GYATT to go outside🍑😩. The sun is acting 𝓯𝓻𝓮𝓪𝓴𝔂 👅", "it's a nice day to go mew outside ⎛⎝ ≽ > ⩊ < ≼ ⎠⎞", "its rizz face weatherദ്ദി(˵ •̀ ᴗ - ˵ ) ✧. The sun be smiling and shhh.", "i'm FEINING to go outside. You should to, it's pretty nice out.🗣🔥🔥🔥"],
    pic: [sunny_1, sunny_2, sunny_3, sunny_5] 
  },

  "random" : {
    caption: ["is it livvyy weather?? (,,>﹏<,,)", "its time to mew outside lol.", "chat, is it nice weather?"],
    pic: [random_1, random_2, random_3, random_4, random_5]
  }
}


const ChillGuy = ({city, description}: { city: string; description: string }) => {
  const [message, setMessage] = useState('');
  const [pic, setPic] = useState('');
  const [yesPopUp, setYesPopUp] = useState(false);
  const [noPopUp, setNoPopUp] = useState(false);
  const [typedDone, setTypedDone] = useState(false);


  const updateMessage = () => {
    const captions = brainrotMap[description]?.caption;
    const beginningMsg = "Based on today's sky freakiness, I'd say "
    if (captions && captions.length > 0) {
      const newMessage = captions[Math.floor(Math.random() * captions.length)];
      setMessage(beginningMsg + newMessage);
    } else {
      const rcaptions = brainrotMap["random"]?.caption;
      const newRMessage = rcaptions[Math.floor(Math.random() * rcaptions.length)];
      setMessage(beginningMsg + newRMessage);
    }
  };

  const updatePic = () => {
    const pic = brainrotMap[description]?.pic;
    if (pic && pic.length > 0) {
      const newPic = pic[Math.floor(Math.random() * pic.length)];
      setPic(newPic);
    }else{
      const rpic = brainrotMap["random"]?.pic;
      const newRpic = rpic[Math.floor(Math.random() * rpic.length)];
      setPic(newRpic);
    }
  };

  const yesClick = () => {
    updateMessage();
    updatePic();
    setYesPopUp(true);
  }

  const noClick = () => {
    setNoPopUp(true);
  }

  const closePopUp = () => {
    setYesPopUp(false);
    setNoPopUp(false);
  }


  useEffect(() => {
    if (description) {
      updateMessage();
      updatePic();

      const typingDelay = 3000; // Adjust this to match the typing duration
      const timer = setTimeout(() => {
        setTypedDone(true);
      }, typingDelay);

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [description]); // Re-run when `description` changes

  return (
    // flex justify-end w-full items-center relative
    <div className='flex items-start'>
      {/* transform -translate-y-20 rounded-lg bg-white/10 py-10 px-5 -mr-20 space-y-10 */}
      <div className= "py-4 px-5 transform translate-x-20 translate-y-5 rounded-lg bg-white/10 space-y-5 shadow-lg shadow-pink-800/50">

        <div className = 'rounded-lg bg-white/10 p-3'>
          <p className = "animate-typing overflow-hidden border-r-4 border-white/50 whitespace-nowrap pr-1">{`Hi, I'm just a chill guy that'll help you with your nonchalant weather rizz.`}</p>
        </div>

        <div className = 'rounded-lg bg-white/10 p-3 flex'>
          {typedDone && (
          <p className = 'animate-typing transition delay-1000 overflow-hidden border-r-4 border-white/20 whitespace-nowrap pr-1'>Want to hear some drip advice? I know you'll answer this right🤓</p>
          )} 
        </div>

        <div className='flex justify-center space-x-6 text-2xl'>
          <button onClick={yesClick} className = 'bg-indigo-500/70 p-3 rounded-lg px-4 hover:bg-indigo-700/70'>Yes</button>
          <button onClick = {noClick} className = 'bg-red-700/60 p-3 rounded-lg px-4 hover:bg-red-900/60'>No</button>
        </div>
  
      </div>

      <img src = {chill_guy} alt="Chill Guy"/>

      {yesPopUp &&  (
        <div className='flex inset-0 fixed items-start justify-center rounded-lg bg-white/70 p-3 z-50'>
          <div className = 'bg-white p-6 rounded-lg relative w-[90%] max-w-xl space-y-7 translate-y-20 shadow-lg shadow-pink-800/50' style={{ width: '100vw', height: '80vh' }}>
            <button className = "absolute top-3 right-3 text-black hover:text-red-500 text-xl" onClick = {closePopUp}>✖</button>
            <p className = 'bg-pink-600/90 p-3 rounded-lg'>I know you wanted some help with your aura. As a nonchalant chill guy, I’m here to teach you how to mog in {city}. 💪 Whether you're avoiding that negative aura 🚫, stepping into your Skibidi Toilet mode, or embracing your alpha, it’s all about mastering the art of dressing to impress. 👗💼</p>
            <p className = 'bg-pink-600/90 p-3 rounded-lg'>{message}</p>     
            <div className = 'flex justify-center'>
              <img
                  className="rounded-lg shadow-1xl shadow-indigo-500/80"
                  src={pic}
                  alt="Meme"
                />
            </div>     
          </div>
        </div>
      )}

      {noPopUp &&  ( 
        <div className = 'flex inset-0 fixed items-start justify-center bg-white/60 p-3 z-50'>
          <button className = "absolute top-3 right-3 text-black hover:text-red-500 text-xl" onClick = {closePopUp}>✖</button>
          <div className='rounded-lg bg-white/90 p-6 flex justify-center items-center text-pink-600 font-bold text-8xl text-center w-full h-full'>
            <p className =''>You just lost -10004438053 aura points💩. Why would you click NO???!!💀🤬 NOW GO CLICK YES YOU OMEGA😵</p>
          </div>
        </div>
      )}
        
    </div>
  )
}

export default ChillGuy
