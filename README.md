# NASA ROVERS PHOTOS APP

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner 

### `npm run build`

Builds the app for production to the `build` folder.\

## About the App
The App is deployed on my personal AWS Amplify:\
https://master.d370m4f0hq237p.amplifyapp.com/

### API KEY
When you enter on the site for the first time it will ask you for your NASA API KEY.\
If you don't have one, you can generate it at https://api.nasa.gov/ \
Since the API KEY is personal and got a limit on the number of request, I think it's ok to ask for it.\
In the case that you don't want to do it in this way, it can be done by generating a general API KEY for the application and saving it as an environment var.
\
\
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/136aea8e-f745-4360-9478-ebd47c17cdab)

Once you enter your API KEY and press ENTER, it will be validated, if not, It will show an error message.
After the API KEY is validated, it will be stored on the local storage, so you won't have to enter it again when revisiting.

![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/f2dd51cf-416d-4250-a9de-d03cb8fa84f1)


### GALLERY
When you enter in the gallery, you will the Configuration button and the photos of the rover Curiosity of a set date. At first, it was developed to show the current date photos, but since not every day got photos uploaded I decided to show cool photos of a set date at the beggining.
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/3e7c1fb3-9b1a-4f26-b496-bc45816865a0)

When you click on any photo it will be displayed on a popup, to close it just click outside.
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/a0fe4fec-78bc-4ab9-998f-fb1d0f0762ec)

When scrolling down, the gallery will be updated with new photos from the API until it retrieves no more by the current configuration, in that case, it will show the message "No photos retrieved"
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/bee82dbb-b759-42e7-a368-4344540b75fa)

If the current filters don't retrieve any photo, it will show the message "No photos retrieved" on yellow
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/e8f51a8d-1384-45e5-9ef0-050c406bd63b)



### Configurations
When clicking on the Configurations button it will display the Configuration Panel.\
Here you can set some filters like selecting a specific rover (Curiosity, Opportunity, or Spirit) and filter photos of one of their cameras.\
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/83a9b39c-deb4-4cdf-8474-5f3bca8133f8)

If you go down on the panel, you will see that you can also filter by date.\
To do this you can select the date from the photos that were taken, you can switch between Earth Date and Martian Date.\
For Earch Date you will have a date picker to select the date from:\
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/b77b41a6-4808-443f-9a27-5222ad24faf2)

For Martian Date you will have an input for a number, this number represents the number of days since the rover landed on Mars, to set the number just press ENTER:\
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/ad5a2dd0-efdb-45b7-8de5-e05c0defb9f6)

If you go to the bottom of the panel you will see 3 buttons: Save Configuration, Load Configuration, and Forget API KEY.\
- **Save Configuration:** Saves the current filters on the local storge.\
- **Load Configuration:** Loads the filters saved on the local storage.\
- **Forget API KEY:** Deletes the API KEY from the local storage, you will be redirected to the API KEY page\
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/b2fbe9c5-32d6-428c-8770-7633b06d7201)

