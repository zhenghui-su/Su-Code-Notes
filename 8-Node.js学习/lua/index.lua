local key = KEYS[1] --接受key值
local limit = tonumber(ARGV[1]) 
local interval = tonumber(ARGV[2])
local count = tonumber(redis.call("get", key) or "0")

if count  > limit then
    return 0
else
    redis.call("incr", key) -- lottery: 0++ 1 2 3 4 5
    redis.call("expire", key, interval) -- lottery: 0 1 2 3 4 5
    return 1
end