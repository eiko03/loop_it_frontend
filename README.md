##  Proceed
```bash
cp.env.backup .env && npm install && npm run dev
```

## All cases
```bash

# install dependency
npm install

# develop
npm run dev

#unit test
npm run test:unit

# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

### Remarks
- Used jest for testing
- Used postcss
- Used Vuex For state management
- Mostly used Element Ui as component




