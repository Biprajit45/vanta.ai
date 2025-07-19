from django.urls import path
from .views import signup, login, forgot_password, reset_password, check_clone_name, set_clone_name, get_clone_name, get_email

urlpatterns = [
    path('signup/', signup),
    path('login/', login),
    path('forgot-password/', forgot_password),
    path('reset-password/', reset_password),
    path('check-clone-name/', check_clone_name),
    path('set-clone-name/', set_clone_name),
    path('get-clone-name/', get_clone_name),
    path('get-email/', get_email),
] 