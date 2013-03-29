landingpage-freifunkfranken
===========================

Eine Startseite, die einem Benutzer von Freifunk-Franken angezeigt wird, bevor er Zugriff auf das Internet bekommt.
Infos gibts unter www.freifunk-franken.de

Status
------

Diese Seite befindet sich noch in aktiver Entwicklung und wird noch nicht produktiv eingesetzt.

Mitmachen
---------

Es d�rfen gerne aussagekr�ftige Issues angelegt werden. Bitte f�r jedes Problem ein eigenes Ticket.
Es werden auch gerne Pull-Requets angenommen. Bitte die Request m�glich klein halten und immer nur ein Issue auf einmal fixen.
Commit-Masseges und Source-Comments bitte auf Englisch.
Danke!

Installation
------------

```
git clone https://github.com/mojoaxel/landingpage-freifunkfranken.git
cd landingpage-freifunkfranken
git checkout gh-pages
npm install connect
node server.js
```
Nun kann man die Landingpage unter http://localhost:8080 öffnen.
