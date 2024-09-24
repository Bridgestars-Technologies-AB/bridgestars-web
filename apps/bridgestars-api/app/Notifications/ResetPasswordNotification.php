<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Config;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public function __construct(public string $url)
    {
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Glömt ditt lösenord?')
            ->greeting('Hej' . ' ' . $notifiable->first_name . '')
            ->line('Vi tog emot en begäran om att återställa ditt lösenord. Om du kan ditt lösenord behöver du inte göra något.')
            ->action('Skapa nytt lösenord', $this->url)
            ->line('Länken är giltig i ' . Config::get('auth.verification.expire', 60) . ' minuter. Om du har några frågor kan du kontakta oss genom att svara på detta mail.')
            ->replyTo(config('mail.from.address'), config('mail.from.name'))
            ->salutation('Vänligen, Bridgestars.');
    }
}
