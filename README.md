# bjit-bookstore-full
# check images 
    docker images

# create image :
    docker build -t sabbir311/my-bookstore-client:latest .
    docker build -t sabbir311/my-bookstore-server:latest .
    docker run -p 27017:27017 -d -it --name bookstore-solo mongo

# run images : 
    client - docker run -p 8080:8080 -d -it --name bookstore-solo-client sabbir311/my-bookstore-client 
    server - docker run -p 8000:8000 -d -it --name bookstore-solo-server sabbir311/my-bookstore-server


# see logs : 
    docker logs bookstore-solo-client
    docker logs bookstore-solo-server


# compose image
    docker compose up
    docker compose down
