
# Credit
	https://github.com/uatec

# Variables

Name | Default | Meaning 
-----|---------|--------
PORT | 80 | The Port that the reverse proxy listens on 
API  | The scheme and hostname of the property API 
CDN  | Scheme and hostname of the blob storage where images and other resources are stored 
CMS  | The scheme and IP (or hostname as long as it does't clash with the one you're using) of the drupal instance 
HOST | The hostname that the reverse proxy should forward to drupal for URL generation 


# How To Run

```
#!bash

node server.js

```


# Note

Use of Port numbers other than 80 might result in Drupal serving links to the default port. :|