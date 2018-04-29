# PHOTOGRAM

Description
-------------------

Introducing a fictional Instagram clone called Photogram

Getting Started !
-------------------

This Web app requires the latest version of [Python and Flask](http://flask.pocoo.org) and [Vuejs](https://vuejs.org/v2/guide/)

Clone the repository:

`$ git clone https://github.com/superrcoop/photogram.git`

Go into the repository:

`$ cd photogram`

Install dependencies:

`$ pip install -r requirements.txt`


Deploy
--------

To test locally,Ensure that [PostgreSQL](https://www.postgresql.org) is installed and running and configure the database URI located in `__init__.py`

Export database URL:

`$ export DATABASE_URL=<DATABASE_URL>`

Setup database: 

~~~
$ python flask-migrations.py db init
$ python flask-migrations.py db migrate
$ python flask-migrations.py db upgrade
~~~

Run:

`$ python run.py`
