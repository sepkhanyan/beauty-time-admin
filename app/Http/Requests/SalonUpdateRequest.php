<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SalonUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required_without' => 'Salon name is required',
            'phone_number.required_without' => 'Phone number is required',
            'phone_number.numeric' => 'Phone number may only contain numbers.',
            'phone_number.digits' => 'Phone number must be 8 digits.',
            'phone_number.unique' => 'Phone number has already been taken.',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name' => ['required_without:status_update', 'max:255'],
            'phone_number' => ['required_without:status_update', 'digits:8', Rule::unique('salons', 'phone_number')->ignore($this['id'])],
        ];

        return $rules;
    }
}
