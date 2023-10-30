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
                        <h2 className="text-xl font-semibold text-gray-700 mb-6">2つのデバイスでシームレスな注文体験を</h2>
                        <p className="text-gray-600 mb-4">
                            スマホやタブレットが2つあれば、お客様との注文プロセスがシンプルになります。<br />
                            店側のスマホやタブレットで注文を確認し、店頭のデバイスで注文を受け付けることができます。
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-grow p-6">
                    <div className="max-w-5xl mx-auto">
                        {/* New Service Improvement Section */}
                        <div className="mb-12">
                            <h2 className="text-xl font-semibold text-gray-700 mb-6">人材不足をITの力で解消</h2>
                            <p className="text-gray-600 mb-4">
                                サービス業は人材の確保が常に大きな課題となっています。<br />
                                特に注文を受ける作業は、繁忙期においてその負荷が増大します。<br />
                                『ちょこっとチケット』は、この問題に対する最適な解決策を提供します。
                            </p>
                            <p className="text-gray-600 mb-4">
                                注文を自動化することで、店舗は人手不足の影響を最小限に抑えることが可能となります。<br />
                                これにより、従業員はより価値ある作業に集中でき、顧客へのサービス品質も向上します。
                            </p>
                            <p className="text-gray-600 mb-4">
                                ITの技術の進化は、サービス業に革命をもたらしています。<br />
                                『ちょこっとチケット』は、その一翼を担い、サービス業の未来を形作るためのツールとして開発されました。<br />
                                私たちの想いは、技術を活用して業界の悩みを解消し、さらなる成長を促進することです。
                            </p>
                            <p className="text-gray-600 mb-4">
                                一緒に、サービス業の新しい未来を築いていきましょう。<br />
                                『ちょこっとチケット』で、人材不足の課題を乗り越え、業界全体の向上を目指します。
                            </p>
                        </div>
                        
                        {/* New Design Appeal Section */}
                        <div className="mb-12">
                            <h2 className="text-xl font-semibold text-gray-700 mb-6">シンプルかつ使いやすいデザイン</h2>
                            <p className="text-gray-600 mb-4">
                                『ちょこっとチケット』は、ユーザーの目を引く美しいデザインだけでなく、使いやすさを最優先に考えたインターフェースを提供しています。現代のデジタル時代において、デザインは単なるビジュアルだけでなく、ユーザー体験（UX）の一部となっています。<br />
                                シンプルさと使いやすさは、それを実現するための鍵です。
                            </p>
                            <p className="text-gray-600 mb-4">
                                当サービスは、ビジネスオーナーや店舗スタッフ、さらにはお客様まで、誰もが迷わずに使えるよう設計されています。<br />
                                明確な案内、直感的な操作、そしてシンプルなデザインが組み合わさり、効率的で快適な体験を提供します。
                            </p>
                            <p className="text-gray-600 mb-4">
                                良いデザインとは、目に見える部分だけでなく、使い手の行動や考えを導くものです。<br />
                                『ちょこっとチケット』では、ユーザーが目的を迅速に達成できるよう、細部にわたり最適化されています。<br />
                                この使いやすさが、長期的な顧客のロイヤリティを築くための重要な要素となっています。
                            </p>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-700 mb-6">ユーザー管理が容易</h2>
                        <p className="text-gray-600 mb-4">
                            新規登録時に管理者ユーザーと一般ユーザーを作成し、役割に応じた操作を行うことができます。<br />
                            これにより、注文管理と顧客体験が向上します。
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
                            <li className="flex items-start">
                                <div className="text-red-500 mr-2">✓</div>
                                <p className="flex-1">管理者ユーザーは、リアルタイムでの注文確認、メニューの編集などの機能を利用できます。</p>
                            </li>
                            <li className="flex items-start">
                                <div className="text-red-500 mr-2">✓</div>
                                <p className="flex-1">一般ユーザーはメニューの注文のみ可能。スタッフルームや厨房での注文確認や、店頭での注文受付がスムーズに。</p>
                            </li>
                        </ul>
                    </div>
                </div>


                {/* CTA Button */}
                <div className="text-center mb-12 mt-12">
                    <Link 
                        href={route('register')} 
                        className="bg-gray-500 hover:underline text-white font-semibold py-4 px-6 rounded-full"
                    >
                        さっそく使ってみる！
                    </Link>
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
                            {/* <Link
                                href={route('menus.index')}
                                className="font-semibold hover:underline"
                            >
                                メニュー
                            </Link> */}
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
