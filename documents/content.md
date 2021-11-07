# APUNTES NGINX
## Virtual Hosts
```
cd /etc/nginx/
ls
ll
cd sites-available
ll
```
Copiar carpeta default y crear uno nuevo 
```
cp default mobbler.ovh/coralteam
ll
```
Cambiar la línea server_name el _ por mobbler/coralteam
La línea root es donde está la ruta de nuestros archivos
La cambiamos por ```/var/www/coralteam```
En la línea de ```listen``` dentro de server tenemos que tener en cuenta el puerto por defecto ya que únicamente puede escuchar en ese sin tener/poder que repetirse, es decir, si creamos varios archivos default, el puerto sólo podría ponerse en un único fichero, no en varios
```
cd ..
cd sites-enabled
ll
```
Veremos que hay un link simbólico (un puntero que apunta a un archivo que está en otro lado) y procederemos a crearlo
ln -s /ruta/origen/archivo /ruta/desitno/archivo
```
ln -s ../sites-available/mobbler.ovh/coralteam
```
![Texto alternativo](/images/nginx.png)
Cargamos nginx
```
nginx -s reload
```

Tenemos que configurar nuestro host para que use php. En el apartado de ``` location ~ \.php ``` procederemos a descomentar la línea que pone ```fastcgi_pass unix:/var/run/php/php...```

Ejecutamos 
``` nginx -t ```
 
Y así comprobamos que la sintaxis de los ficheros, en concreto, el .conf está bien

Cargamos nuevamente el servidor
```
systemctl reload nginx
```
En el navegador, cuando entremos a nuestro dominio y nos dé error de 500, volveremos a la consola y veremos qué es lo que nos dice el log
Este comando lo que hace es mantener el archivo abierto mientras se ejecute el servidor y seguirá escribiendo el log por consola en el caso de que haya algún cambio
```
tail -f /var/log/nginx/error.log 
```