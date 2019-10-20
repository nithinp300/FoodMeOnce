docker build -t wonkgo1/frontend .
docker run --rm -it -v ${PWD}:/frontend -p3000:3000 wonkgo1/frontend