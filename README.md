SCREAM APP 

frontend react,redux,docker,nginx 

backend nodejs,express,docker,nginx and postgres

#installation

git fetch https://github.com/gautamaman30/scream-react.git

add links to backend server in redux-action 

run to build image: docker build -t repo_name:tag_name . 
#dont forget the dot 

then run container: docker run -a stdout --name container_name -p 3000:80 repo_name:tag_name

go to : http://localhost:3000 

