all: backend

.PHONY : clean

clean:
	rm -rf package-lock.json npm-shrinkwrap.json node_modules
    npm cache clean --force
    npm cache verify
    npm install

backend:
	docker-compose -f docker/local-dev-compose.yml -p seaweedfs up

