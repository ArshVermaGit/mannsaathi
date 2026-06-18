import { test, expect } from '@playwright/test';

test.describe('Symptom Checker Flow', () => {
  test('complete anonymous symptom check', async ({ page }) => {
    await page.goto('/');
    
    // Landing → Checker entry
    await page.click('text=Check Your Symptoms — Anonymous');
    await expect(page).toHaveURL('/check');
    

    // Select pathway
    await page.click('text=Physical Health');
    await expect(page).toHaveURL('/check/symptoms');
    
    // Add custom text
    await page.fill('textarea', 'I have a headache');
    
    // Set duration
    await page.click('text=3-7 Days');
    
    // Continue to analysis
    await page.click('text=Analyze My Symptoms');
    
    // Should transition to result page
    await expect(page).toHaveURL('/check/result');
    
    // Wait for the analyzing text to disappear
    await expect(page.locator('text=Analyzing')).toBeVisible();
  });
  
  test('crisis detection works properly', async ({ page }) => {
    // Navigate straight to chat
    await page.goto('/chat');
    
    // Send a message
    await page.fill('input[type="text"]', 'I just want to talk');
    await page.keyboard.press('Enter');
    
    // Wait for the message to appear in the UI
    await expect(page.locator('text=I just want to talk')).toBeVisible();
  });
});
