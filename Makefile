all: backend

.PHONY : clean

clean:

backend:
	docker-compose -f docker/local-dev-compose.yml -p seaweedfs up
