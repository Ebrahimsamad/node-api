- Making sure to follow best practices like validation, error handling, hashing, etc. Also, moduralize your app into files.

Enhance the server you created in the previous lab and do the following:

1. Add a new model for users and create a 1 to many relation between users and posts.

2. Add Authentication for your api using JWT (you get bonus if you implement it using session cookies).

3. Now imagine you can have 2 types of users normal users and admin. Create an endpoint that is only accessible for users who have admin role.
   The endpoint should return all users existing in your application.

4. Add the ability to upload images in your api.

## Bonus

- Create a simple api that takes an image and resizes it. Use sharp package to resize image.

Imagine you are creating image resizing service. Where users upload and image and specify width and height and you server back the resized image.

---

Using previous lab api

1. Use winston to add logging to your server.

- Log everywhere that needs to be logged like when a user add a post, or when an error happens like user authentication failed.

- Use different log levels

- Store the logs in a file.
