export const verifyInstagramUsername = async (username: string): Promise<{ isValid: boolean; isPrivate?: boolean; profilePicUrl?: string }> => {
  // Simulate API call with basic validation and random private status
  await new Promise(resolve => setTimeout(resolve, 1500));
  const isValid = /^[a-zA-Z0-9._]{1,30}$/.test(username) && !username.includes('..');
  
  if (!isValid) {
    return { isValid: false };
  }

  // Simulate fetching profile data
  const isPrivate = Math.random() > 0.5;
  const profilePicUrl = isValid ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}` : undefined;

  return {
    isValid,
    isPrivate,
    profilePicUrl,
  };
};