landingpage-freifunkfranken
===========================

Eine Startseite, die einem Benutzer von Freifunk-Franken angezeigt wird, bevor er Zugriff auf das Internet bekommt.
Informationen gibt es unter www.freifunk-franken.de .

Status
------

Diese Seite befindet sich in aktiver Entwicklung und wird noch nicht produktiv eingesetzt.   
Der aktuelle Stand ist einsehbar auf http://freifunkfranken.github.io/landingpage-freifunkfranken/

Mitmachen
---------

Es dürfen gerne aussagekräftige Issues angelegt werden. Bitte für jedes Problem ein eigenes Ticket.   
Es werden auch Pull-Requets angenommen. Die Request dabei möglich klein halten und immer nur ein Issue auf einmal fixen.   
Commit-Messages und Source-Comments bitte auf Englisch.   
Danke!

Installation
------------

```
git clone https://github.com/FreifunkFranken/landingpage-freifunkfranken.git
cd landingpage-freifunkfranken
git checkout gh-pages
npm install connect
node server.js
```
Nun kann die Landingpage unter http://localhost:8080 geöffnet werden.

Serverseitig
------------

Grob gesagt funktioniert das so: Es wird in einer Datenbank nachgeschaut, ob der Nutzer schon "eingeloggt" ist. Wenn nein, dann wird er auf die URL in deny_info umgeleitet.
Auf alle URLs die "freifunk" im Namen haben, kann man immer zugreifen, deshalb kann auch die Splashpage geladen werden.
Wenn der Nutzer auf die URL http://freifunkfranken.github.io/landingpage-freifunkfranken/FreifunkFrankenAccess.html geht, wird er in die Datenbank geschrieben und somit für 86400 Sekunden freigeschaltet. 

Hier ist der relevante Teil der squid.conf:

```
#für alles was nicht ein Browser ist den Durchgang erlauben
acl brs browser Mozilla
http_access allow !brs

#Das hier definiert eine Datenbank gegen die Nutzer abgeglichen werden, da steht quasi für jede IP-Adresse drin, ob das freigeschaltet ist oder nicht. Nach 86400 Sekunden wird der Eintrag rausgeworfen
external_acl_type session ttl=2 concurrency=100 %SRC /usr/lib/squid3/squid_session -a -t 86400 -b /var/lib/squid/session.db
acl session_login external session LOGIN
acl session_is_active external session

#URL zum Einloggen
acl clicked_login_url url_regex -i http://freifunkfranken.github.io/landingpage-freifunkfranken/FreifunkFrankenAccess.html

#Wenn die URL zum einloggen verwendet wurde, einloggen
http_access allow clicked_login_url session_login

#Immer Zugriff zu Freifunk Franken erlauben
acl freifunk_franken_url url_regex -i freifunk
http_access allow freifunk_franken_url
#sonst
http_access deny !session_is_active

#URL der Landingpage
deny_info http://freifunkfranken.github.io/landingpage-freifunkfranken/ session_is_active
```
