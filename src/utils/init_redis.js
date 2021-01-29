const redis = require('redis');

const client = redis.createClient({
  port: "15765",
  host: "redis-15765.c244.us-east-1-2.ec2.cloud.redislabs.com",
  password: "LduqrQGDKt3Js5l5uUq1Lhd2zr2k6x6j"
})

client.on('connect', () => {
  console.log('Client connected to redis...')
})

client.on('ready', () => {
  console.log('Client connected to redis and ready to use...')
})

client.on('error', (err) => {
  console.log(err.message)
})

client.on('end', () => {
  console.log('Client disconnected from redis')
})

process.on('SIGINT', () => {
  client.quit()
})

module.exports = client