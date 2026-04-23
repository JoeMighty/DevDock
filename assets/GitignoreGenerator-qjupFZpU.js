import{l as e,r as t,t as n}from"./jsx-runtime-CHRMzJ5I.js";import{t as r}from"./copy-CT0RlTi6.js";import{t as i}from"./download-BacgCPts.js";import{F as a}from"./index-B8xGRV4k.js";var o=e(t(),1),s=n(),c=[{id:`node`,label:`Node.js`,emoji:`🟢`,category:`Languages`,content:`# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*
.npm
.node_repl_history
*.tgz
.yarn-integrity
.env
.env.local
.env.*.local
dist/
build/
coverage/
`},{id:`python`,label:`Python`,emoji:`🐍`,category:`Languages`,content:`# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
dist/
*.egg-info/
.eggs/
.env
venv/
env/
.venv/
*.pyc
.pytest_cache/
.coverage
htmlcov/
`},{id:`go`,label:`Go`,emoji:`🐹`,category:`Languages`,content:`# Go
*.exe
*.exe~
*.dll
*.so
*.dylib
*.test
*.out
bin/
vendor/
`},{id:`rust`,label:`Rust`,emoji:`🦀`,category:`Languages`,content:`# Rust
/target/
**/*.rs.bk
Cargo.lock
`},{id:`java`,label:`Java`,emoji:`☕`,category:`Languages`,content:`# Java
*.class
*.log
*.jar
*.war
*.nar
*.ear
*.zip
target/
.gradle/
build/
!gradle/wrapper/gradle-wrapper.jar
.classpath
.project
.settings/
`},{id:`csharp`,label:`C#`,emoji:`#️⃣`,category:`Languages`,content:`# C#
bin/
obj/
*.user
*.suo
*.userosscache
*.sln.docstates
.vs/
*.pidb
*.booproj
*.svd
*.userprefs
`},{id:`php`,label:`PHP`,emoji:`🐘`,category:`Languages`,content:`# PHP
vendor/
.env
composer.phar
.phpunit.result.cache
`},{id:`ruby`,label:`Ruby`,emoji:`💎`,category:`Languages`,content:`# Ruby
*.gem
*.rbc
.bundle/
build/
vandor/bundle
.rvmrc
Gemfile.lock
`},{id:`react`,label:`React`,emoji:`⚛️`,category:`Frameworks`,content:`# React
node_modules/
build/
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.DS_Store
`},{id:`nextjs`,label:`Next.js`,emoji:`▲`,category:`Frameworks`,content:`# Next.js
node_modules/
.next/
out/
build/
.env
.env.local
.env.*.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
`},{id:`vue`,label:`Vue`,emoji:`💚`,category:`Frameworks`,content:`# Vue
node_modules/
dist/
.env
.env.local
.env.*.local
`},{id:`laravel`,label:`Laravel`,emoji:`🔴`,category:`Frameworks`,content:`# Laravel
vendor/
.env
.env.backup
storage/
bootstrap/cache/
public/storage
*.key
`},{id:`django`,label:`Django`,emoji:`🟩`,category:`Frameworks`,content:`# Django
*.pyc
__pycache__/
.env
db.sqlite3
/static/
/media/
.DS_Store
`},{id:`docker`,label:`Docker`,emoji:`🐳`,category:`DevOps`,content:`# Docker
.docker/
docker-compose.override.yml
*.env
`},{id:`terraform`,label:`Terraform`,emoji:`🏗️`,category:`DevOps`,content:`# Terraform
.terraform/
*.tfstate
*.tfstate.backup
.terraform.lock.hcl
crash.log
override.tf
override.tf.json
`},{id:`macos`,label:`macOS`,emoji:`🍎`,category:`Operating Systems`,content:`# macOS
.DS_Store
.AppleDouble
.LSOverride
Icon
._*
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns
.com.apple.timemachine.donotpresent
`},{id:`windows`,label:`Windows`,emoji:`🪟`,category:`Operating Systems`,content:`# Windows
Thumbs.db
Thumbs.db:encryptable
ehthumbs.db
ehthumbs_vista.db
*.stackdump
[Dd]esktop.ini
$RECYCLE.BIN/
*.cab
*.msi
*.msix
*.msm
*.msp
*.lnk
`},{id:`linux`,label:`Linux`,emoji:`🐧`,category:`Operating Systems`,content:`# Linux
*~
.fuse_hidden*
.directory
.Trash-*
.nfs*
`},{id:`vscode`,label:`VS Code`,emoji:`🔵`,category:`IDEs`,content:`# VS Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
!.vscode/*.code-snippets
.history/
*.vsix
`},{id:`jetbrains`,label:`JetBrains`,emoji:`🧠`,category:`IDEs`,content:`# JetBrains
.idea/
*.iml
*.iws
*.ipr
.idea_modules/
atlas.json
`},{id:`xcode`,label:`Xcode`,emoji:`🔨`,category:`IDEs`,content:`# Xcode
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata/
*.xccheckout
*.moved-aside
DerivedData/
*.xcuserstate
`}],l=Array.from(new Set(c.map(e=>e.category)));function u(){let[e,t]=(0,o.useState)(new Set([`node`,`macos`,`vscode`])),n=e=>{t(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})},u=c.filter(t=>e.has(t.id)).map(e=>e.content).join(`
`);return(0,s.jsxs)(`div`,{className:`h-full flex flex-col space-y-4`,children:[(0,s.jsxs)(`div`,{className:`flex justify-between items-center mb-2`,children:[(0,s.jsxs)(`h2`,{className:`text-2xl font-bold flex items-center gap-2`,children:[(0,s.jsx)(a,{className:`w-6 h-6 text-primary`}),` .gitignore Generator`]}),(0,s.jsxs)(`div`,{className:`flex gap-2`,children:[(0,s.jsxs)(`button`,{onClick:()=>navigator.clipboard.writeText(u),disabled:!u,className:`flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted text-sm font-semibold rounded-md border border-border transition-colors disabled:opacity-40`,children:[(0,s.jsx)(r,{className:`w-4 h-4`}),` Copy`]}),(0,s.jsxs)(`button`,{onClick:()=>{let e=new Blob([u],{type:`text/plain`}),t=document.createElement(`a`);t.href=URL.createObjectURL(e),t.download=`.gitignore`,t.click()},disabled:!u,className:`flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors disabled:opacity-40`,children:[(0,s.jsx)(i,{className:`w-4 h-4`}),` Download`]})]})]}),(0,s.jsxs)(`p`,{className:`text-sm text-muted-foreground/80`,children:[`Select your tech stack to generate a perfectly combined `,(0,s.jsx)(`code`,{className:`font-mono text-primary bg-primary/10 px-1 rounded`,children:`.gitignore`}),`. Combines templates without duplicates.`]}),(0,s.jsxs)(`div`,{className:`grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 flex-1 min-h-[400px]`,children:[(0,s.jsx)(`div`,{className:`flex flex-col gap-5 overflow-y-auto pr-1`,children:l.map(t=>(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1`,children:t}),(0,s.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:c.filter(e=>e.category===t).map(t=>(0,s.jsxs)(`button`,{onClick:()=>n(t.id),className:`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold border transition-all ${e.has(t.id)?`bg-primary/10 border-primary text-primary shadow-sm`:`bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40`}`,children:[(0,s.jsx)(`span`,{children:t.emoji}),(0,s.jsx)(`span`,{children:t.label})]},t.id))})]},t))}),(0,s.jsxs)(`div`,{className:`bg-[#1e1e1e] border border-border rounded-xl overflow-hidden flex flex-col shadow-sm`,children:[(0,s.jsxs)(`div`,{className:`text-xs font-bold text-muted-foreground uppercase px-4 py-2 bg-black/20 border-b border-border/50 flex justify-between`,children:[(0,s.jsx)(`span`,{children:`.gitignore`}),(0,s.jsxs)(`span`,{className:`text-primary`,children:[e.size,` stacks selected`]})]}),(0,s.jsx)(`textarea`,{readOnly:!0,value:u,className:`flex-1 bg-transparent p-4 resize-none outline-none font-mono text-xs text-green-300 leading-relaxed`,spellCheck:`false`,placeholder:`Select stacks on the left...`})]})]})]})}export{u as default};