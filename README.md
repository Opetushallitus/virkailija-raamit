# virkailija-raamit
Virkailijan työpöydän navigaatiovalikko.

### Raamien lokaali kehitys
`cd src/main/static/`

`npm install`

`npm start`

Mene selaimella: `http://localhost:3000`

### Prod buildin kehitys
`mvn clean install`

Uudelleennimeä target kansion .war => `virkailija-raamit.war` ja aja tomcatilla

### Lokaalin NGINX-serverin käynnistäminen

Seuraavat ohjeet vaativat asennetun Dockerin ja npm:n.

Virkailijan työpöydän navigaatiovalikko on mahdollista käynnistää lokaalisti porttiin 8080. Tämä on hyödyllistä, jos haluat esimerkiksi testata navigaatiovalikkoa lokaalisti Kosken kanssa. Tätä varten seuraa dokumentaatiota Kosken GitHub-repositoriossa: https://github.com/Opetushallitus/koski