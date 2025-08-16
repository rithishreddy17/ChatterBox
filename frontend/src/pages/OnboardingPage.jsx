import { useState } from 'react';
import useAuthUser from '../components/useAuthUser'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CameraIcon } from 'lucide-react';
import { completeOnboarding } from '../lib/api';

const OnboardingPage = () => {
  
  const {authUser} = useAuthUser();

  const [formState, setFormState] = useState({
    fullName : authUser?.fullName || "",
    bio : authUser?.bio || "",
    nativeLanguage : authUser?.nativeLanguage || "",
    learningLanguage : authUser?.learningLanguage || "",
    location : authUser?.location || "",
    profilePic : authUser?.profilePic || ""
  });

  const queryClient = useQueryClient();
  const {mutate: onboardingMutation, isPending, error} = useMutation({
    mutationFn : completeOnboarding,
    onSuccess : () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({queryKey: ["authUser"]});
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  }


  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete your Profile</h1>

          <form onSubmit={handleSubmit}>
            {/* Profile Pic Container*/}

            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Image Preview */}

              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                { formState.profilePic ? (
                  <img src={formState.profilePic} alt="Profile Preview" className="w-full h-full object-cover" />
                )
                : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40"/>
                  </div>
                )}

              </div>


            </div>
          </form>

          


        </div>

      </div>
      
    </div>
  )
}

export default OnboardingPage
