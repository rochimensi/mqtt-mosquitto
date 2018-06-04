# mqtt-mosquitto
MQTT Client using Mosquitto Broker

MQTT is a machine-to-machine (M2M)/"Internet of Things" connectivity protocol. 

It was designed as an extremely lightweight **publish/subscribe** messaging transport. 

It is useful for connections with remote locations where a small code footprint is required and/or network bandwidth is at a premium.

MQTT messaging protocol:

![diagram](./MQTT%20protocol.png)

## Pre-requisites

Install Node dependencies: `npm install`

## Environment Variables

Add the following on a `.env` file:

```
MOSQUITTO_HOST=<mqtt://IP:PORT where Mosquitto broker is runing>
```

## Run Client as Docker Container

1. Build the container image: `docker build -t mqtt-client:1.0 .`
2. Run the image container: `docker run -it -p 9000:9000 --env-file .env mqtt-client:1.0`