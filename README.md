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
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/2484388c-0257-4ae9-a81e-b76e7bfce0af)


Once you enter your API KEY and press ENTER, it will be validated, if not, It will show an error message.
After the API KEY is validated, it will be stored on the local storage, so you won't have to enter it again when revisiting.

![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/2c36bbcb-5d7c-4b7f-9385-33b789aa35b9)



### GALLERY
When you enter in the gallery, you will the Configuration button and the photos of the rover Curiosity on a set date. At first, it was developed to show the current date photos, but since not every day got photos uploaded I decided to show cool photos of a set date at the beginning!
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/cdff4776-40e2-4a15-a018-b757495162d0)


When you click on any photo it will be displayed on a popup, to close it just click outside.
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/026f845b-13c8-431e-9855-27596fcb04c7)


When scrolling down, the gallery will be updated with new photos from the API until it retrieves no more by the current configuration, in that case, it will show the message "No photos retrieved"
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/34fab958-cd23-4153-bcf2-de4ab6ec61e6)


If the current filters don't retrieve any photo, it will show the message "No photos retrieved" on yellow
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/01b5802a-cf10-41bf-a045-449e830d555d)




### Configurations
When clicking on the Configurations button it will display the Configuration Panel.\
Here you can set some filters like selecting a specific rover (Curiosity, Opportunity, or Spirit) and filter photos of one of their cameras.\
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/99fcced0-aaf9-4b1d-95b4-ac411174d7c9)


If you go down on the panel, you will see that you can also filter by date.\
To do this you can select the date from the photos that were taken, you can switch between Earth Date and Martian Date.\
For Earch Date you will have a date picker to select the date from:\
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/8f43993f-74ac-487f-85b9-243ff74dcf29)


For Martian Date you will have an input for a number, this number represents the number of days since the rover landed on Mars, to set the number just press ENTER:\
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/6a8ab799-9a18-447a-b279-a8396777891a)


If you go to the bottom of the panel you will see 3 buttons: Save Configuration, Load Configuration, and Forget API KEY.\
- **Save Configuration:** Saves the current filters on the local storge.\
- **Load Configuration:** Loads the filters saved on the local storage.\
- **Forget API KEY:** Deletes the API KEY from the local storage, you will be redirected to the API KEY page\
![image](https://github.com/nicolas-logo/nasa-photo-viewer-app/assets/26005281/57354e76-6e69-4f35-b48a-4b215739563f)


