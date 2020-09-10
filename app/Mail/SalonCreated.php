<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SalonCreated extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The order instance.
     *
     * @var $user
     */
    public $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.salon_created')
            ->from(config('mail.from.address'), config('mail.from.name'))
            ->subject('Test')
            ->with([
                'greetingText' => 'Greetings from BeautyTime!',
                'openUrl' => 'http://beautytime-salon',
                'clickText' => 'Click me',
                'managerEmail' => $this->user['email'],
                'managerPassword' => $this->user['password']
            ]);
    }
}
