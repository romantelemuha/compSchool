"use strict"

let burgerMenu=document.querySelector('.burger');
let banner=document.querySelector('.banner');
let closeBanner=document.querySelector('.closeBanner');
let header=document.querySelector('header');
let nav=document.querySelector('nav');
let otherFunctions=document.querySelector('.otherFunctions');
let languageButton=document.querySelector('.languageButton');
let themeButton=document.querySelector('.themeButton');
let logo=document.querySelector('.logo');
let form=document.querySelector(".bannerForm");
let phoneHour=document.querySelectorAll('.hour');
let mainImage=document.querySelector(".mainPicture");
let smallPicture=document.querySelectorAll(".smallPicture");
let left = document.querySelector('.left');
let right = document.querySelector('.right');
let sliderPictures = document.querySelectorAll('.slide');

if(burgerMenu){
    burgerMenu.addEventListener('click', function(){
        burgerMenu.classList.toggle('burgerDark');

        if(header){
            header.classList.toggle('headerMobile');
        }
        if(nav){
            nav.classList.toggle('navMobile');
        }
        if(logo){
            logo.classList.toggle('logoDark');
        }
        if(otherFunctions){
            otherFunctions.classList.toggle('otherFunctionsMobile');
            if(languageButton){
                languageButton.src='img/material-symbols-dark_language.svg';
            }
            if(themeButton){
                themeButton.src='img/codicon_color-modeDark.svg';
            }
        }
    });
}

if(banner){
    setTimeout(function(){
        banner.classList.toggle('bannerExist');
    }, 7000)
}

if(closeBanner){
    closeBanner.addEventListener('click', function(){
       if(banner){
            banner.classList.toggle('bannerExist');
       }
    });
}

let userData={
    userPhone: "",
    userTime: ""
}

phoneHour.forEach(function(element){
    element.addEventListener('click', function(evt){
        evt.stopPropagation();
        userData.userTime=evt.target.textContent;
    });
})

if(form){
    form.addEventListener('submit', function(evt){
        evt.preventDefault();
    
        userData.userPhone= form.elements.yourPhone.value;

        if(userData.userPhone===""){
            alert("All the fields must be filled");
            return;
        }

        let userDataText= JSON.stringify(userData);
        localStorage.setItem("UserInfo", userDataText);
    
        form.reset();
        banner.classList.remove('bannerExist');
        alert("Вас успішно зареєстровано!");
    })
}

let language={
    en: {
        scm: "SCM",
        mainHref: "MainPage",
        aboutUsHref: "AboutUs",
        programHref: "The curriculum",
        rezultsHref: "Feedback",
        contactsHref: "Contacts",
        scmFullName: "Computer skills school",
        aboutScm: "Over 20 years of experience! We teach from basic computer literacy to front-end developer from the age of 8.",
        chooseCourse: "Choose course",
        phoneUs: "phone us",
        city1: "Ivano-Frankivsk: 099-231-15-19",
        city2: "Kryvyi Rih : 068-206-07-34",
        city3: "Zaporizhzhya: 067-544-54-02",
        consultation: "Get a free consultation",
        phone: "When to call back",
        writeMe: "Sign up",
        min1: "10min",
        min2: "30min",
        min3: "1h"
    },
    ua: {
        scm: "ШКМ",
        mainHref: "Головна",
        aboutUsHref: "Про нас",
        programHref: "Навчальна програма",
        rezultsHref: "Відгуки",
        contactsHref: "Контакти",
        scmFullName: "школа комп’ютерної майстерності",
        aboutScm: " Досвід більше 20 років! Навчаємо від базової комп’ютерної грамотності до front-end розробника з 8 років.",
        chooseCourse: "Вибрати курс",
        phoneUs: "Зателефонувати нам",
        city1: "Івано-Франківськ: 099-231-15-19",
        city2: "Кривий Ріг: 068-206-07-34",
        city3: "Запоріжжя: 067-544-54-02",
        consultation: "Отримайте безкоштовну консультацію",
        phone: "Коли передзвонити",
        writeMe: "Записатися",
        min1: "10хв",
        min2: "30хв",
        min3: "1год"
    }
}

function changeLanguage(lang){
    let allElements=document.querySelectorAll("[data-leng]"); 
    allElements.forEach((element)=>{
        let attribute=element.getAttribute("data-leng");
        element.textContent=language[lang][attribute];
    })
}

if(languageButton){
    languageButton.addEventListener('click', function(){
        languageButton.classList.toggle('ua');
        languageButton.classList.toggle('en');
        if(languageButton.classList.contains('ua')){
            changeLanguage("ua");
        }
        if(languageButton.classList.contains('en')){
            changeLanguage("en");
        }
    })
}

let pictureIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initialiseSlider);

function initialiseSlider() {
    if (sliderPictures.length > 0) {
        sliderPictures[pictureIndex].classList.add("showSlide");
        intervalId = setInterval(nextSlider, 3000);
    }
}

function showSlide(index) {
    if (index >= sliderPictures.length) {
        pictureIndex = 0;
    } else if (index < 0) {
        pictureIndex = sliderPictures.length - 1;
    }

    sliderPictures.forEach((element) => {
        element.classList.remove("showSlide");
    });
    sliderPictures[pictureIndex].classList.add("showSlide");
}

left.addEventListener('click', prevSlider);

function prevSlider() {
    clearInterval(intervalId);
    pictureIndex--;
    showSlide(pictureIndex);
    intervalId = setInterval(nextSlider, 3000);
}

right.addEventListener('click', nextSlider);

function nextSlider() {
    clearInterval(intervalId);
    pictureIndex++;
    showSlide(pictureIndex);
    intervalId = setInterval(nextSlider, 3000);
}

if(smallPicture){
    smallPicture.forEach((element)=>{
        if(element){
            element.addEventListener('click', function(){
                let smallPictureAdress=this.getAttribute('src');
                if(mainImage){
                    mainImage.src=smallPictureAdress;
                }
            });
        }
    })
}
