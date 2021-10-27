---
netlifycms_content_folder: "exampleSite/content"
outputs:
- netlifyyaml
url: /admin/config.yml
---
backend:
  name: "github"
  repo: "vjeantet/hugo-theme-docport"
  branch: "master"
  open_authoring: true

media_folder: "static/images/uploads" # Media files will be stored in the repo under images/uploads
public_folder: "/images/uploads" # The src attribute for uploaded media will begin with /images/uploads
publish_mode: editorial_workflow