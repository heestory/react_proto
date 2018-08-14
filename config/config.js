let config = {};

config.redisPassword = "";
config.redisDatabase = 1;
config.redisPort = 6379;

config.cacheInfo={};

if(process.env.NODE_ENV == "development"){ // dev, qa
    config.redisHost = "localhost";
    config.cacheInfo.expire = 1; // 1secs

}else{ // production
    config.redisHost = "encarmagazine.xkhpe6.ng.0001.apn2.cache.amazonaws.com";
    config.cacheInfo.expire = 600; // 600secs
}

config.cacheInfo = {
    host: config.redisHost,
    port: config.redisPort,
    auth_pass: config.redisPassword,
    prefix: "front",
    expire: config.cacheInfo.expire,
    type: 'text/html'
};