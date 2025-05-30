const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log("Database connected")
    })
    .catch(err => {
    console.log("Database connection error")
    })

    const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
      const camp = new Campground({
        //your user id
        author: '68359d77459cb367021bbf57',
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, commodi at sunt nisi, officia vitae quibusdam vel molestias, iste tempore quia. Ab quam eius vitae possimus, cum architecto exercitationem nihil. Accusamus, debitis sapiente. Laborum beatae nulla aliquam repudiandae aut, molestiae, culpa reprehenderit eos, consectetur corrupti animi quod cumque ipsam. Odio, aperiam? Nobis voluptates quo excepturi, quaerat odit voluptate soluta adipisci! Non, sed pariatur.Et facilis cum accusantium illum, iste inventore perspiciatis at earum possimus ea numquam dolor eos! Itaque minima saepe, voluptates delectus dignissimos incidunt porro nulla sapiente molestias.Dolorum ?',
          price,
        geometry: {
          type: 'Point',
          coordinates: [cities[random1000].longitude,
            cities[random1000].latitude,
        ]
        },
        images: [
                {
                  url: 'https://res.cloudinary.com/dyprhosse/image/upload/v1748358762/YelpCamp/ljvsmxcvf9hulblhlufa.jpg',
                  filename: 'YelpCamp/ljvsmxcvf9hulblhlufa',
                },
                {
                  url: 'https://res.cloudinary.com/dyprhosse/image/upload/v1748360366/YelpCamp/d8cq9x8jrizrvrbjmbo8.jpg',
                  filename: 'YelpCamp/d8cq9x8jrizrvrbjmbo8',
                },
                {
                  url: 'https://res.cloudinary.com/dyprhosse/image/upload/v1748359921/YelpCamp/yupao2vpci16yloosyyl.jpg',
                  filename: 'YelpCamp/yupao2vpci16yloosyyl',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
    