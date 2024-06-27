# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


# Optimization
## api/v1/areas.json
### Before

1915
720ms (Views: 0.3ms | ActiveRecord: 31.5ms | Allocations: 497831)
593ms (Views: 0.3ms | ActiveRecord: 29.4ms | Allocations: 497454)
586ms (Views: 0.1ms | ActiveRecord: 34.7ms | Allocations: 497364)
895ms (Views: 0.1ms | ActiveRecord: 35.7ms | Allocations: 497478)
595ms (Views: 0.3ms | ActiveRecord: 32.4ms | Allocations: 497666)

2000 (all republic)
784ms (Views: 0.2ms | ActiveRecord: 40.3ms | Allocations: 867312)
1079ms (Views: 0.2ms | ActiveRecord: 31.0ms | Allocations: 867730)
1012ms (Views: 0.2ms | ActiveRecord: 38.0ms | Allocations: 867532)
985ms (Views: 0.1ms | ActiveRecord: 38.1ms | Allocations: 867251)
909ms (Views: 0.2ms | ActiveRecord: 30.1ms | Allocations: 867535)
1012ms (Views: 0.1ms | ActiveRecord: 27.6ms | Allocations: 867564)

### After
398ms (Views: 0.1ms | ActiveRecord: 38.4ms | Allocations: 668664)
593ms (Views: 0.1ms | ActiveRecord: 180.1ms | Allocations: 588853)
725ms (Views: 0.1ms | ActiveRecord: 320.7ms | Allocations: 588835)
479ms (Views: 0.3ms | ActiveRecord: 47.0ms | Allocations: 584751)
574ms (Views: 0.1ms | ActiveRecord: 153.7ms | Allocations: 585309)


##### coordinates
id: 232
### Before
12ms (Views: 7.6ms | ActiveRecord: 0.8ms | Allocations: 12367)
11ms (Views: 7.4ms | ActiveRecord: 0.6ms | Allocations: 12354)
10ms (Views: 6.7ms | ActiveRecord: 0.6ms | Allocations: 12363)
26ms (Views: 21.0ms | ActiveRecord: 0.9ms | Allocations: 12385)
11ms (Views: 6.7ms | ActiveRecord: 0.7ms | Allocations: 12375)
