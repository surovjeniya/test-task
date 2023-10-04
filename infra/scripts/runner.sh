load_env(){
    cd ../envs
    PWD_ENV=${PWD}/infra.env
    echo "=======> Using envs from ${PWD_ENV}. <=========";
}

load_docker_compose(){
    cd ..
    DOCKER_COMPOSE_PATH=$PWD/docker-compose.yml;
    echo "=======> Using docker-compose from ${DOCKER_COMPOSE_PATH}. <=========";
}

help(){
    echo "cases:\nprod (run all services)\nbrowserless/redis (run only redis and puppetter)"
    exit 1;
}

_PARAM_TARGET=$1

case $_PARAM_TARGET in
    "browserless/redis") load_env; load_docker_compose; docker-compose -f $DOCKER_COMPOSE_PATH --env-file $PWD_ENV --profile browserless/redis up --build;;
    "prod") load_env; load_docker_compose; docker-compose -f $DOCKER_COMPOSE_PATH --env-file $PWD_ENV --profile prod up --build -d;;

  *) help;;
esac