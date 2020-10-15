SCREAM APP

#frontend react,redux,docker,nginx

#backend nodejs,express,docker,nginx and postgres


#backend include microservices

dockerized api gateway,authentication, profile, scream, image services 



#installation react 

git pull https://github.com/gautamaman30/scream-react.git

add links to backend server in redux-action

run to build image: docker build -t repo_name:tag_name . #dont forget the dot

then run container: docker run -a stdout --name container_name -p 3000:80 repo_name:tag_name




#installation backend

git pull https://github.com/gautamaman30/scream-backend.git

#repeat for each services

#dont forget the dot 

#command line path should be the service whom image you are building

run to build image: docker build -t repo_name:tag_name . 
 
then run container: docker run -a stdout --name container_name -p localPort:3000 repo_name:tag_name

go to : http://localhost:3000
