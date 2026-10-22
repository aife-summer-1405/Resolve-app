const AboutHouse = () => {
    return (
        <div dir="rtl" className="space-y-6 text-gray-300">
            <div>
                <h2 className="mb-3 text-lg font-semibold text-white">
                    درباره اقامتگاه
                </h2>
                <p className="text-sm leading-8">
                    اقامتگاه کلک با فضایی آرام و دلنشین، انتخابی مناسب برای
                    افرادی است که می‌خواهند اقامتی راحت و به‌یادماندنی را
                    تجربه کنند. این اقامتگاه با طراحی زیبا و امکانات مناسب،
                    محیطی مطلوب برای سفرهای خانوادگی و دوستانه فراهم کرده است.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-[#3b3b3b] p-4">
                    <p className="mb-2 text-sm text-gray-400">ظرفیت</p>
                    <p className="font-semibold text-white">۴ نفر</p>
                </div>

                <div className="rounded-xl bg-[#3b3b3b] p-4">
                    <p className="mb-2 text-sm text-gray-400">تعداد اتاق</p>
                    <p className="font-semibold text-white">۲ اتاق</p>
                </div>

                <div className="rounded-xl bg-[#3b3b3b] p-4">
                    <p className="mb-2 text-sm text-gray-400">متراژ</p>
                    <p className="font-semibold text-white">۱۲۰ متر</p>
                </div>
            </div>

            <div>
                <h3 className="mb-2 font-semibold text-white">قوانین اقامتگاه</h3>
                <ul className="list-inside list-disc space-y-2 text-sm leading-7">
                    <li>تحویل اقامتگاه از ساعت ۱۴ امکان‌پذیر است.</li>
                    <li>زمان تخلیه اقامتگاه ساعت ۱۲ ظهر است.</li>
                    <li>برگزاری مهمانی بدون هماهنگی قبلی مجاز نیست.</li>
                    <li>همراه داشتن مدارک شناسایی معتبر الزامی است.</li>
                </ul>
            </div>
        </div>
    );
};

export default AboutHouse;