/* eslint-disable react/prop-types */


// eslint-disable-next-line react/prop-types
const AuthorDetail = ({author}) => {

    console.log("author",author)
    if(author)
  return (
    <div className="h-screen w-full  flex items-center justify-center font-sherif 	">
      
      <div className="border-l-2 border-blue-400">
      <div className="p-6">
        <div className="font-semibold text-2xl max-w-md ">
          {
            // eslint-disable-next-line react/prop-types
            author.description || `“Vel ultricies morbi odio facilisi ultrices accumsan donec lacus
            purus. Lectus nibh ullamcorper ac dictum justo in euismod. Risus
            aenean ut elit massa. In amet aliquet eget cras. Sem volutpat enim
            tristique.”`
          }
        </div>

        <div className="flex mt-2">
          <div>
            <img
              className=" mt-2 w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              src={ author.imageUrl || `https://www.picclickimg.com/C8IAAOSw~WtbmZmg/Pikachu-Gaming-Mascot-Logo-Game-Gamer-Car-Decal.webp`}
              alt=""
            />
          </div>
          <div className="ml-4">
             {/* eslint-disable-next-line react/prop-types */}
            <div className="font-semibold text-l ">{author.firstName} {author.lastName}</div>
            
             {/* eslint-disable-next-line react/prop-types */}
            <div className="font-extralight antialiased ">@{author.username}</div>
          </div>  
        </div>
      </div>
      </div>
    </div>
  );
};

export default AuthorDetail;
