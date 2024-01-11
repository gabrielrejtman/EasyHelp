import mysql.connector as sql

db = sql.connect(
    host ='localhost',
    user ='root',
    password ='',
    database ='cadastro'
)

mycursor = db.cursor()

# mycursor.execute("CREATE TABLE Person (name varchar(30), age smallint UNSIGNED, personID int PRIMARY KEY auto_increment)")

mycursor.execute("insert into person (name, age) values(%s, %s)", ("Joao", 20))
#db.commit()
# mycursor.execute()

mycursor.execute("select * from person")

for x in mycursor:
    print(x)