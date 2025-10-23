# Authentication Setup Guide

## Overview

Your portfolio website now has a sleek, minimalistic 4-digit code authentication system that requires visitors to enter a password before accessing the content.

## Current Access Code

**Access Code: `5910`**

⚠️ **Important:** Change this code to your own secure 4-digit number!

## How to Change the Access Code

1. Open the file: [`src/components/Auth.js`](src/components/Auth.js:8)

2. Find line 8 where the access code is defined:
   ```javascript
   this.accessCode = '5910'; // 4-digit access code
   ```

3. Replace `'5910'` with your own 4-digit code:
   ```javascript
   this.accessCode = '1234'; // Your custom 4-digit code
   ```

4. Save the file. The changes will take effect immediately if the dev server is running.

## Design Features

### Clean & Minimalistic
- ✅ Large gradient "MASCHA" title
- ✅ 4 separate input boxes for each digit
- ✅ Centered, clean layout
- ✅ Subtle animations and focus effects
- ✅ Automatic code verification
- ✅ LinkedIn contact link at bottom

### User Experience
- Auto-focus on first input box
- Automatic progression to next box when typing
- Backspace navigation between boxes
- Arrow key navigation (left/right)
- Paste support (paste all 4 digits at once)
- Visual feedback with box shadows and borders
- Smooth success/error animations

## How Authentication Works

### Session-Based Access
- Once authenticated, users can access the site for the entire browser session
- Closing the browser tab or window will require re-authentication
- Authentication state is stored in `sessionStorage` (not `localStorage`)
- Each new browser tab requires separate authentication

### Automatic Verification
- Code is automatically checked when all 4 digits are entered
- No submit button needed
- Smooth checking animation
- Error state with shake animation for incorrect codes
- Success animation when correct code is entered

## Testing the Authentication

### Development Testing

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open in browser:**
   - Go to `http://localhost:3000`
   - You should see the authentication screen with 4 input boxes

3. **Test authentication:**
   - Enter the code: `5910` (or your custom code)
   - Each digit automatically moves to the next box
   - Portfolio loads automatically after 4th digit

4. **Test features:**
   - Backspace to go back to previous box
   - Arrow keys to navigate between boxes
   - Paste 4 digits at once (Ctrl+V)
   - Try wrong code to see error animation

5. **Test session persistence:**
   - Refresh the page - you should remain authenticated
   - Open a new tab to the same URL - you'll need to authenticate again

6. **Test logout (for testing):**
   - Open browser console (F12)
   - Type: `sessionStorage.clear()`
   - Refresh the page - authentication screen should appear

### Production Testing

After deploying to Vercel:

1. Visit your live site URL
2. Authentication screen should appear
3. Enter your 4-digit access code
4. Site should load normally

## Deployment to Vercel

The authentication works automatically with Vercel deployment. No additional configuration needed!

### Deploy Steps:

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Update authentication with 4-digit code system"
   git push
   ```

2. **Vercel will automatically:**
   - Detect the changes
   - Build the project
   - Deploy with authentication enabled

3. **Test on production:**
   - Visit your live site
   - Enter the 4-digit access code
   - Verify everything works

## Customization Options

### Change Visual Style

Edit [`src/styles/auth.css`](src/styles/auth.css:1) to customize:

- Input box size and spacing (lines 139-157)
- Border colors and effects (lines 139-157)
- Focus animations (lines 162-170)
- Title gradient (lines 84-92)
- Error states (lines 176-185)

### Change Layout

Edit [`src/components/Auth.js`](src/components/Auth.js:40) to modify:

- Title text (line 40)
- Label text (line 45)
- LinkedIn link (line 62)
- Footer text (line 60)

### Input Box Configuration

The input boxes are configured to:
- Accept only numeric input (0-9)
- Maximum 1 character per box
- Auto-advance on input
- Support paste operation

## Security Considerations

### Current Security Level
This is a **client-side authentication** system suitable for:
- ✅ Portfolio protection from casual visitors
- ✅ Limiting access to work-in-progress content
- ✅ Professional presentation with clean UX

### Not Suitable For:
- ❌ Protecting highly sensitive data
- ❌ Multiple user accounts
- ❌ Production applications with critical data

### Why?
- The code is stored in the JavaScript bundle
- Technical users can view source code
- No server-side validation
- No database or user management

### For Enterprise Security:
If you need stronger security, consider:
- Server-side authentication (Node.js backend)
- Database-backed user system
- JWT tokens
- OAuth integration

## Troubleshooting

### Authentication Screen Not Appearing
1. Clear browser cache
2. Check browser console for errors (F12)
3. Verify [`Auth.js`](src/components/Auth.js:1) is imported in [`main.js`](src/main.js:13)
4. Verify [`auth.css`](src/styles/auth.css:1) is imported in [`main.js`](src/main.js:9)

### Input Boxes Not Visible
1. Check CSS is loading properly
2. Verify box borders and background colors are set
3. Check browser console for style errors
4. Try different browser

### Can't Enter Code
1. Click on first input box to focus
2. Check keyboard is working
3. Try paste operation (Ctrl+V with 4 digits copied)
4. Check browser console for JavaScript errors

### Code Not Working
1. Verify you're using the correct code (case-sensitive for letters if modified)
2. Check [`Auth.js`](src/components/Auth.js:8) line 8 for current code
3. Clear browser cache and refresh
4. Check console for authentication messages

### Auto-Advance Not Working
1. Ensure each box has `maxlength="1"` attribute
2. Check JavaScript event listeners are attached
3. Verify browser console for errors

### Session Lost Too Quickly
- This is normal behavior
- Authentication uses `sessionStorage` (not `localStorage`)
- Session ends when browser tab is closed
- To change this, modify [`Auth.js`](src/components/Auth.js:7) to use `localStorage` instead

## Files Modified

The authentication system consists of these files:

```
src/
├── components/
│   └── Auth.js          # Authentication component with 4-digit input logic
├── styles/
│   └── auth.css         # Minimalistic styling for auth screen
└── main.js              # Updated to include auth check
```

## Remove Authentication

To remove authentication and make the site public again:

1. **Remove auth imports from [`main.js`](src/main.js:1):**
   - Remove: `import './styles/auth.css';`
   - Remove: `import Auth from './components/Auth.js';`

2. **Restore original init function in [`main.js`](src/main.js:283):**
   - Replace the authentication-enabled `init()` function with the original version
   - Remove the `initApp()` function
   - Remove authentication-related state properties

3. **Delete authentication files:**
   ```bash
   rm src/components/Auth.js
   rm src/styles/auth.css
   rm AUTH_SETUP.md
   ```

## Keyboard Shortcuts

When authentication screen is active:

- **Tab** - Move between input boxes
- **Arrow Left/Right** - Navigate between boxes
- **Backspace** - Delete current digit and move to previous box
- **0-9** - Enter digit in current box
- **Ctrl+V** - Paste 4-digit code

## Accessibility

The authentication system includes:

- Keyboard navigation support
- ARIA labels for screen readers
- Focus indicators for keyboard users
- High contrast borders and text
- Reduced motion support for accessibility preferences

## Support

For questions or issues:
- Check browser console for error messages
- Review this documentation
- Contact via LinkedIn (link on auth screen)

## License

This authentication system is part of your portfolio and follows the same license.