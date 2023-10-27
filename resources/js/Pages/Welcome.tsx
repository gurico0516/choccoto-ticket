import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />

            <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
                
                {/* Header Section */}
                <div className="p-6 bg-white shadow-md">
                    <h1 className="text-2xl font-bold text-gray-800">ちょこっとチケット</h1>
                </div>

                <div className="flex-grow p-6">
                    {/* Main Visual */}
                    <div className="mb-6">
                        <img src="/img/main-visual.jpg" alt="メインビジュアル" className="w-full object-cover" style={{ maxHeight: '600px' }} />
                    </div>
                    
                    <div className="max-w-5xl mx-auto">
                        {/* ... 他のコード ... */}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-grow p-6">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-xl font-semibold text-gray-700 mb-6">シンプルなテイクアウト専門アプリ</h2>
                        <p className="text-gray-600 mb-4">
                            ちょこっとチケットは、テイクアウトの注文をシンプルにし、店側にはメニューの管理を容易にします。
                        </p>

                        {/* Feature List */}
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="text-red-500 mr-2">✓</div>
                                <p className="flex-1">店側はメニューの追加、編集、修正が簡単に行えます。</p>
                            </li>
                            <li className="flex items-start">
                                <div className="text-red-500 mr-2">✓</div>
                                <p className="flex-1">導入すると、お客様は店内で簡単に注文ができます。</p>
                            </li>
                            <li className="flex items-start">
                                <div className="text-red-500 mr-2">✓</div>
                                <p className="flex-1">注文完了時には、注文番号を発行。注文番号を記録または撮影して、商品受取時に提示します。</p>
                            </li>
                            <li className="flex items-start">
                                <div className="text-red-500 mr-2">✓</div>
                                <p className="flex-1">店内で注文した商品の一覧を確認できます。</p>
                            </li>
                            <li className="flex items-start">
                                <div className="text-red-500 mr-2">✓</div>
                                <p className="flex-1">発行した注文番号と注文受付一覧を確認し、商品を受け取ります。</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="bg-gray-800 text-white p-6">
                    {auth.user ? (
                        <Link
                            href={route('menus.index')}
                            className="font-semibold hover:underline"
                        >
                            メニュー一覧へ
                        </Link>
                    ) : (
                        <div className="flex justify-between">
                            <Link
                                href={route('menus.index')}
                                className="font-semibold hover:underline"
                            >
                                メニュー一覧
                            </Link>
                            <div>
                                <Link
                                    href={route('login')}
                                    className="mr-4 font-semibold hover:underline"
                                >
                                    ログイン
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="font-semibold hover:underline"
                                >
                                    新規登録
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
