First you have to install git. You can download it from here : http://git-scm.com/downloads
-----------------------------------------------------------------------------------------------------------------
After that you have to make a local folder on your pc. This is where you will save the data from the repo.
------------------------------------------------------------------------------------------------------------------
While inside the folder right click on it and then choose "open git bash here"
------------------------------------------------------------------------------------------------------------------
After that you have to type in the console : 

git pull https://github.com/wIksS/Team-Meat     // this downloads all data in the repository to your folder
------------------------------------------------------------------------------------------------------------------
Now you have all files. You can change them, delete them, add new ones.
------------------------------------------------------------------------------------------------------------------
When you have finished your work and you want to commit you have to open git bash again like we did when we wanted to pull the repo.

In the console type : 

git add -A

git commit -m "Your commit message"

git remote add origin https://github.com/wIksS/Team-Meat.git     // you do this only the first time you commit

git push origin master 		// Then you are asked for username and password (type your credentials)
---------------------------------------------------------------------------------------------------------------

This is how you work with git.

